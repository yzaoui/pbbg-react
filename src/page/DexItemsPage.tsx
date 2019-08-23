import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import "./DexPage.css";
import LoadingSpinner from "../LoadingSpinner";
import * as DexEndpoint from "../backend/dex";
import DexItemEntry from "../DexItemEntry";
import { Subscription } from "rxjs";
import dexService from "../backend/dex.service";

type DexItems = DexEndpoint.ItemsResponse;

interface State {
    state: "loading" | "error" | DexItems;
}

class DexItemsPage extends React.Component<RouteComponentProps, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        this.request = dexService.getItems()
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
            <div className="dex-header"><h1>Item Dex</h1></div>
            <div className="dex-container">{this.renderContainer()}</div>
        </>;
    }

    renderContainer = () => {
        if (this.state.state === "loading") return <LoadingSpinner />;
        else if (this.state.state === "error") return "ERROR";

        const { discoveredItems, lastItemIsDiscovered } = this.state.state;

        let lastDiscoveredId = -1;

        return <ol className="dex">
            {Object.entries(discoveredItems)
                .map(([id, item]) => <DexItemEntry key={id} id={id} item={item} />)}
        </ol>;
    };
}

export default DexItemsPage;
