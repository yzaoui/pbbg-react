import React from "react";
import { Squad } from "../backend/squad";
import squadService from "../backend/squad.service";
import { Subscription } from "rxjs";
import LoadingSpinner from "../component/LoadingSpinner";
import PBBGUnit from "../component/PBBGUnit";
import classNames from "classnames";

interface State {
    state: "loading" | "error" | Squad;
    healing: boolean;
}

class SquadPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        state: "loading",
        healing: false
    };

    request?: Subscription;

    componentDidMount() {
        this.request = squadService.getSquad().subscribe(
            res => this.setState({ state: res.data }),
            error => this.setState({ state: "error" })
        );
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        if (this.state.state === "loading") return <LoadingSpinner />;
        else if (this.state.state === "error") return "ERROR";

        return <>
            <button
                className={classNames("fancy", { "loading": this.state.healing })}
                style={{ alignSelf: "center" }}
                onClick={this.handleHealClick}
                disabled={this.state.healing}
            >
                Heal Squad{this.state.healing ? " (Loading…)" : ""}
            </button>
            {this.state.state.units.map(unit => <PBBGUnit key={unit.id} unit={unit} style={{ margin: "4px" }} />)}
        </>;
    }

    handleHealClick = () => {
        this.setState({ healing: true });

        this.request = squadService.healSquad().subscribe(
            res => this.setState({ healing: false, state: res.data }),
            error => this.setState({ healing: false, state: "error" })
        );
    };
}

export default SquadPage;
