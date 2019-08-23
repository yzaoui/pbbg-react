import React from "react";
import * as DexEndpoint from "../backend/dex";
import { Link, RouteComponentProps } from "react-router-dom";
import "./DexPage.css";
import LoadingSpinner from "../LoadingSpinner";
import { Subscription } from "rxjs";
import dexService from "../backend/dex.service";

type DexUnits = DexEndpoint.Response;

interface State {
    state: "loading" | "error" | DexUnits;
}

class DexUnitsPage extends React.Component<RouteComponentProps> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        this.request = dexService.getUnits()
            .subscribe(
                res => this.setState({ state: res.data }),
                error => this.setState({ state: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        return <>
            <Link to="/dex" className="dex-return">⬅️ Return to Dex</Link>
            <div className="dex-container">
                {this.renderContainer()}
            </div>
        </>;
    }

    renderContainer = () => {
        if (this.state.state === "loading") return <LoadingSpinner />;
        else if (this.state.state === "error") return "ERROR";

        const { discoveredUnits, lastUnitIsDiscovered } = this.state.state;

        return "[WIP] Loaded successfully.";
    };
}

export default DexUnitsPage;
