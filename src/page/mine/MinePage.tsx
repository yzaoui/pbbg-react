import React from "react";
import { Route, RouteComponentProps } from "react-router";
import MineListPage from "./MineListPage";
import { Subscription } from "rxjs";
import mineService from "../../backend/mine.service";
import { Mine as MineData } from "../../backend/mine";
import LoadingSpinner from "../../component/LoadingSpinner";
import Mine from "../../component/mine/Mine";

const MinePage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={IndexPage} />
    <Route path={match.url + "/list"} exact component={MineListPage} />
</>;

interface State {
    state: "loading" | "error" | MineData | "exited";
}

class IndexPage extends React.Component<RouteComponentProps, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

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

                    this.setState({ state: res.data })
                },
                error => this.setState({ state: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        const state = this.state.state;

        if (state === "loading") return <LoadingSpinner />;
        else if (state === "error") return "ERROR";
        else if (state === "exited") return "Exited";

        return <>
            <button className="fancy" style={{ alignSelf: "center" }} onClick={this.handleExitMineClick}>Exit mine</button>
            <Mine mine={state} />
        </>;
    }

    handleExitMineClick = () => {
        this.request = mineService.exitMine()
            .subscribe(
                res => this.setState({ state: "exited" }),
                error => this.setState({ state: "error" })
            )
    };
}

export default MinePage;
