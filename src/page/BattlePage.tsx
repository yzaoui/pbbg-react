import React, { CSSProperties } from "react";
import { Subscription } from "rxjs";
import LoadingSpinner from "../component/LoadingSpinner";
import battleService from "../backend/battle.service";
import { Battle } from "../backend/battle";

type State = {
    status: "loading";
} | {
    status: "loaded";
    battle: Battle | null;
} | {
    status: "generating battle";
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

        else if (this.state.status === "loaded") {
            if (this.state.battle === null) return <button className="fancy" style={{ alignSelf: "center" }} onClick={this.handleGenerateBattleClick}>
                <span>Generate battle</span>
            </button>;

            else return <>Battle loaded!</>;
        }

        else if (this.state.status === "generating battle") return <button className="fancy loading" disabled style={{ alignSelf: "center" }}>
            <span>Generating battle</span>
            <LoadingSpinner style={loadingStyle} />
        </button>;
    }

    handleGenerateBattleClick = () => {
        this.setState({ status: "generating battle" });

        this.request = battleService.generateBattle()
            .subscribe(
                res => this.setState({ status: "loaded", battle: res.data }),
                error => this.setState({ status: "error" })
            );
    };
}

const loadingStyle: CSSProperties = {
    width: "14px",
    height: "14px",
    borderWidth: "3px",
    marginLeft: "5px"
};

export default BattlePage;
