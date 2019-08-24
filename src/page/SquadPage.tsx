import React from "react";
import { Squad } from "../backend/squad";
import squadService from "../backend/squad.service";
import { Subscription } from "rxjs";
import LoadingSpinner from "../component/LoadingSpinner";

interface State {
    state: "loading" | "error" | Squad;
}

class SquadPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        this.request = squadService.getSquad()
            .subscribe(
                res => this.setState({ state: res.data }),
                error => this.setState({ state: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        if (this.state.state === "loading") return <LoadingSpinner />;
        else if (this.state.state === "error") return "ERROR";

        return <>
            <button className="fancy" style={{ alignSelf: "center" }}>Heal Squad</button>
        </>;
    }
}

export default SquadPage;
