import React from "react";
import { Subscription } from "rxjs";
import LoadingSpinner from "../component/LoadingSpinner";
import battleService from "../backend/battle.service";
import { Battle } from "../backend/battle";
import classNames from "classnames";

type State = {
    status: "loading";
} | {
    status: "loaded";
    battle: Battle | null;
} | {
    status: "error";
};

class BattlePage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        document.title = "Battle - PBBG";

        this.request = battleService.getBattle()
            .subscribe(
                res => this.setState({ status: "loaded", battle: res.data }),
                error => this.setState({ status: "error" })
            );
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        if (this.state.status === "loading") return <LoadingSpinner style={{ alignSelf: "center" }} />;
        else if (this.state.status === "error") return <>ERROR</>;

        return <button
            className="fancy"
            style={{ alignSelf: "center" }}
        >Generate battle</button>
    }
}

export default BattlePage;
