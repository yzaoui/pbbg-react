import React, { CSSProperties } from "react";
import { Route, RouteComponentProps } from "react-router";
import MineListPage from "./MineListPage";
import { Subscription } from "rxjs";
import mineService from "../../backend/mine.service";
import { Mine as MineData } from "../../backend/mine";
import LoadingSpinner from "../../component/LoadingSpinner";
import Mine from "../../component/mine/Mine";
import userService from "../../backend/user.service";
import { LevelProgress } from "../../backend/user";
import PBBGLevelProgress from "../../component/PBBGLevelProgress";
import LevelInfo from "../../component/LevelInfo";
import MineLog from "../../component/mine/MineLog";

const MinePage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={IndexPage} />
    <Route path={match.url + "/list"} exact component={MineListPage} />
</>;

interface State {
    state: "loading" | "error" | (MineData & { miningLvl: "loading" | LevelProgress }) | "exited";
}

class IndexPage extends React.Component<RouteComponentProps, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;
    userRequest?: Subscription;

    componentDidMount() {
        const locationState = this.props.location.state;

        if (locationState && locationState.mine) {
            this.props.history.replace({ pathname: this.props.location.pathname });
            return this.setState({ state: locationState.mine });
        }

        this.request = mineService.getMine()
            .subscribe(
                res => {
                    if (res.data === null) return this.props.history.push("/mine/list");

                    this.setState({ state: { ...res.data, miningLvl: "loading" } });
                    // Start loading mining level
                    this.getUser();
                },
                error => this.setState({ state: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
        this.userRequest && this.userRequest.unsubscribe();
    }

    render() {
        const state = this.state.state;

        if (state === "loading") return <LoadingSpinner />;
        else if (state === "error") return "ERROR";
        else if (state === "exited") return "Exited";

        return <>
            <button className="fancy" style={style} onClick={this.handleExitMineClick}>Exit mine</button>
            <Mine mine={state} style={style} />
            {state.miningLvl === "loading" ? <LoadingSpinner style={style} /> : <LevelInfo levelProgress={state.miningLvl} style={style} />}
            <MineLog />
        </>;
    }

    handleExitMineClick = () => {
        this.request = mineService.exitMine()
            .subscribe(
                res => this.setState({ state: "exited" }),
                error => this.setState({ state: "error" })
            )
    };

    getUser = () => {
        this.userRequest = userService.get()
            .subscribe(
                res => {
                    const miningLvl = res.data.mining;
                    const state = this.state.state as MineData;

                    this.setState({ state: { ...state, miningLvl } })
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
