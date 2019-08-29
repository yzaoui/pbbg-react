import React, { CSSProperties } from "react";
import { Route, RouteComponentProps } from "react-router";
import MineListPage from "./MineListPage";
import { Subscription } from "rxjs";
import mineService from "../../backend/mine.service";
import { Mine as MineData, MineActionResult } from "../../backend/mine";
import LoadingSpinner from "../../component/LoadingSpinner";
import Mine from "../../component/mine/Mine";
import userService from "../../backend/user.service";
import { LevelProgress } from "../../backend/user";
import LevelInfo from "../../component/LevelInfo";
import MineLog from "../../component/mine/MineLog";
import inventoryService from "../../backend/inventory.service";
import { InventoryEntry } from "../../backend/inventory";
import InventoryItem from "../../component/inventory/InventoryItem";

const MinePage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={IndexPage} />
    <Route path={match.url + "/list"} exact component={MineListPage} />
</>;

interface State {
    state: "loading" | "error" | MineLoaded | "exited";
}

type MineLoaded = MineData & {
    miningLvl: "loading" | LevelProgress;
    pickaxe: "loading" | InventoryEntry | null;
    results: MineActionResult[];
};

class IndexPage extends React.Component<RouteComponentProps, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    mineRequest?: Subscription;
    userRequest?: Subscription;
    inventoryRequest?: Subscription;

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
        const state = this.state.state;

        if (state === "loading") return <LoadingSpinner />;
        else if (state === "error") return "ERROR";
        else if (state === "exited") return "Exited";

        /* Mining level */
        let miningLvlComponent;
        if (state.miningLvl === "loading") miningLvlComponent = <LoadingSpinner style={style} />;
        else miningLvlComponent = <LevelInfo levelProgress={state.miningLvl} style={style} />;

        /* Pickaxe */
        let pickaxeComponent;
        let pickaxe;
        if (state.pickaxe === "loading") {
            pickaxeComponent = <LoadingSpinner style={style} />;
            pickaxe = null;
        } else if (state.pickaxe === null) {
            pickaxeComponent = <>No pickaxe equipped</>;
            pickaxe = null;
        } else {
            pickaxeComponent = <InventoryItem inventoryEntry={state.pickaxe} style={style} />;
            pickaxe = state.pickaxe
        }

        return <>
            <button className="fancy" style={style} onClick={this.handleExitMineClick}>Exit mine</button>
            <Mine mine={state} style={style} pickaxe={pickaxe} onMineAction={this.handleMineAction} />
            {miningLvlComponent}
            {pickaxeComponent}
            <MineLog results={state.results} />
        </>;
    }

    handleExitMineClick = () => {
        this.mineRequest = mineService.exitMine()
            .subscribe(
                res => this.setState({ state: "exited" }),
                error => this.setState({ state: "error" })
            )
    };

    handleMineAction = (x: number, y: number) => {
        this.performMineAction(x, y);
    };

    setMineStateAndStartLoadingOtherState = (mineData: MineData) => {
        this.setState({ state: { ...mineData, miningLvl: "loading", pickaxe: "loading", results: [] } });
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
                error => this.setState({ state: "error" })
            )
    };

    loadMiningLevel = () => {
        this.userRequest = userService.get()
            .subscribe(
                res => {
                    const state = this.state.state as MineLoaded;
                    const miningLvl = res.data.mining;

                    this.setState({ state: { ...state, miningLvl } })
                },
                error => this.setState({ state: "error" })
            )
    };

    loadPickaxe = () => {
        this.inventoryRequest = inventoryService.getInventory()
            .subscribe(
                res => {
                    const state = this.state.state as MineLoaded;
                    const pickaxe = res.data.equipment.pickaxe;

                    if (pickaxe === undefined) return this.setState({ state: { ...state, pickaxe: null } });

                    this.setState({ state: { ...state, pickaxe } })
                },
                error => this.setState({ state: "error" })
            )
    };

    performMineAction = (x: number, y: number) => {
        this.mineRequest = mineService.performMineAction({ x, y })
            .subscribe(
                res => {
                    const state = this.state.state as MineLoaded;

                    this.setState({ state: { ...state, results: state.results.concat(res.data) } });
                },
                error => this.setState({ state: "error" })
            )
    };
}

const style: CSSProperties = {
    marginBottom: "4px",
    alignSelf: "center"
};

export default MinePage;
