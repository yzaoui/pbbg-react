import React, { CSSProperties } from "react";
import { Route, RouteComponentProps } from "react-router";
import MineListPage from "./MineListPage";
import { Subscription } from "rxjs";
import mineService from "../../backend/mine.service";
import { LevelUp, Mine as MineData, MinedItemResult } from "../../backend/mine";
import LoadingSpinner from "../../component/LoadingSpinner";
import Mine from "../../component/mine/Mine";
import userService from "../../backend/user.service";
import { LevelProgress } from "../../backend/user";
import LevelInfo from "../../component/LevelInfo";
import MineLog from "../../component/mine/MineLog";
import inventoryService from "../../backend/inventory.service";
import { InventoryEntry, Point } from "../../backend/inventory";
import InventoryItem from "../../component/inventory/InventoryItem";
import { Howl } from "howler";
// @ts-ignore
import pickaxeMP3 from "../../audio/pickaxe.mp3";
// @ts-ignore
import pickaxeOGG from "../../audio/pickaxe.ogg";
// @ts-ignore
import levelUpMP3 from "../../audio/level-up.mp3";
// @ts-ignore
import levelUpOGG from "../../audio/level-up.ogg";
// @ts-ignore
import exitMineMP3 from "../../audio/enter_mine.mp3";
// @ts-ignore
import exitMineOGG from "../../audio/enter_mine.ogg";
import { Link } from "react-router-dom";

const MinePage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={IndexPage} />
    <Route path={match.url + "/list"} exact component={MineListPage} />
</>;

type State = {
    status: "loading";
} | {
    status: "error";
} | {
    status: "loaded";
    mine: MineData;
    miningLvl: "loading" | LevelProgress;
    pickaxe: "loading" | InventoryEntry | null;
    submittingAction: Point | null;
    results: (MinedItemResult | LevelUp)[];
} | {
    status: "exited";
    miningLvl: "loading" | LevelProgress;
    pickaxe: "loading" | InventoryEntry | null;
    results: (MinedItemResult | LevelUp)[];
};

class IndexPage extends React.Component<RouteComponentProps, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    mineRequest?: Subscription;
    userRequest?: Subscription;
    inventoryRequest?: Subscription;

    pickaxeSound = new Howl({
        src: [pickaxeMP3, pickaxeOGG],
        preload: true
    });

    levelUpSound = new Howl({
        src: [levelUpMP3, levelUpOGG],
        preload: true
    });

    exitSound = new Howl({
        src: [exitMineMP3, exitMineOGG],
        preload: true
    });

    componentDidMount() {
        const locationState = this.props.location.state;

        if (locationState && locationState.mine) {
            this.props.history.replace({ pathname: this.props.location.pathname });
            this.setMineStateAndStartLoadingOtherState(locationState.mine);

            return;
        }

        this.loadMine();
    }

    componentWillUnmount() {
        this.mineRequest && this.mineRequest.unsubscribe();
        this.userRequest && this.userRequest.unsubscribe();
        this.inventoryRequest && this.inventoryRequest.unsubscribe();
    }

    render() {
        if (this.state.status === "loading") return <LoadingSpinner />;
        else if (this.state.status === "error") return <>ERROR</>;

        return <>
            {this.state.status === "loaded" ? <>
                <button className="fancy" style={style} onClick={this.handleExitMineClick}>Exit mine</button>
                <Mine
                    mine={this.state.mine}
                    style={style}
                    pickaxe={this.state.pickaxe !== "loading" ? this.state.pickaxe : null}
                    submittingAction={this.state.submittingAction}
                    onMineAction={this.handleMineAction}
                />
            </>: this.state.status === "exited" ?
                <Link to={"/mine/list"} className="fancy" style={style}>Return to mine list</Link>
            : {}}

            {/* Mining level */}
            {this.state.miningLvl === "loading" ?
                <LoadingSpinner style={style} />
            :
                <LevelInfo levelProgress={this.state.miningLvl} style={style} />
            }

            {/* Equipped pickaxe slot */}
            {this.state.pickaxe === "loading" ?
                <LoadingSpinner style={style} />
            : this.state.pickaxe === null ?
                <>No pickaxe equipped</>
            :
                <InventoryItem inventoryEntry={this.state.pickaxe} style={style} />
            }
            <MineLog results={this.state.results} expanded={this.state.status === "exited"} />
        </>;
    }

    handleExitMineClick = () => {
        this.exitMine();
    };

    handleMineAction = (x: number, y: number) => {
        this.performMineAction(x, y);
    };

    setMineStateAndStartLoadingOtherState = (mineData: MineData) => {
        document.title = `${mineData.type.name} - PBBG`;
        this.setState({ status: "loaded", mine: mineData, miningLvl: "loading", pickaxe: "loading", submittingAction: null, results: [] });
        this.loadMiningLevel();
        this.loadPickaxe()
    };

    loadMine = () => {
        this.mineRequest = mineService.getMine()
            .subscribe(
                res => {
                    if (res.data === null) return this.props.history.push("/mine/list");

                    this.setMineStateAndStartLoadingOtherState(res.data)
                },
                error => this.setState({ status: "error" })
            )
    };

    loadMiningLevel = () => {
        this.userRequest = userService.get()
            .subscribe(
                res => {
                    if (this.state.status !== "loaded") throw Error();
                    const miningLvl = res.data.mining;

                    this.setState({ ...this.state, miningLvl });
                },
                error => this.setState({ status: "error" })
            )
    };

    loadPickaxe = () => {
        this.inventoryRequest = inventoryService.getInventory()
            .subscribe(
                res => {
                    if (this.state.status !== "loaded") throw Error();
                    const pickaxe = res.data.equipment.pickaxe;

                    this.setState({ ...this.state, pickaxe });
                },
                error => this.setState({ status: "error" })
            )
    };

    performMineAction = (x: number, y: number) => {
        this.setState({ ...this.state, submittingAction: { x, y } });

        this.mineRequest = mineService.performMineAction({ x, y })
            .subscribe(
                res => {
                    if (this.state.status !== "loaded") throw Error();

                    this.pickaxeSound.play();

                    if (res.data.levelUps.length > 0) {
                        this.levelUpSound.play();
                    }

                    this.setState({
                        ...this.state,
                        mine: res.data.mine,
                        miningLvl: res.data.miningLvl,
                        submittingAction: null,
                        results: this.state.results.concat(res.data.minedItemResults).concat(res.data.levelUps)
                    });
                },
                error => this.setState({ status: "error" })
            )
    };

    exitMine = () => {
        this.mineRequest = mineService.exitMine()
            .subscribe(
                res => {
                    this.exitSound.play();
                    this.setState({ status: "exited" });
                },
                error => this.setState({ status: "error" })
            )
    };
}

const style: CSSProperties = {
    marginBottom: "4px",
    alignSelf: "center"
};

export default MinePage;
