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

const MinePage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={IndexPage} />
    <Route path={match.url + "/list"} exact component={MineListPage} />
</>;

type State = {
    status: "loading"
} | {
    status: "error"
} | {
    status: "loaded"
    mine: MineData;
    miningLvl: "loading" | LevelProgress;
    pickaxe: "loading" | InventoryEntry | null;
    submittingAction: Point | null;
    results: (MinedItemResult | LevelUp)[];
} | {
    status: "exited"
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
        else if (this.state.status === "exited") return <>Exited</>;

        /* Mining level */
        let miningLvlComponent;
        if (this.state.miningLvl === "loading") miningLvlComponent = <LoadingSpinner style={style} />;
        else miningLvlComponent = <LevelInfo levelProgress={this.state.miningLvl} style={style} />;

        /* Pickaxe */
        let pickaxeComponent;
        let pickaxe;
        if (this.state.pickaxe === "loading") {
            pickaxeComponent = <LoadingSpinner style={style} />;
            pickaxe = null;
        } else if (this.state.pickaxe === null) {
            pickaxeComponent = <>No pickaxe equipped</>;
            pickaxe = null;
        } else {
            pickaxeComponent = <InventoryItem inventoryEntry={this.state.pickaxe} style={style} />;
            pickaxe = this.state.pickaxe
        }

        return <>
            <button className="fancy" style={style} onClick={this.handleExitMineClick}>Exit mine</button>
            <Mine mine={this.state.mine} style={style} pickaxe={pickaxe} submittingAction={this.state.submittingAction} onMineAction={this.handleMineAction} />
            {miningLvlComponent}
            {pickaxeComponent}
            <MineLog results={this.state.results} />
        </>;
    }

    handleExitMineClick = () => {
        this.mineRequest = mineService.exitMine()
            .subscribe(
                res => this.setState({ status: "exited" }),
                error => this.setState({ status: "error" })
            )
    };

    handleMineAction = (x: number, y: number) => {
        this.performMineAction(x, y);
    };

    setMineStateAndStartLoadingOtherState = (mineData: MineData) => {
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
}

const style: CSSProperties = {
    marginBottom: "4px",
    alignSelf: "center"
};

export default MinePage;
