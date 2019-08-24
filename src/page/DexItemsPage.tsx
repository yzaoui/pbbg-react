import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import "./DexSubpage.css";
import LoadingSpinner from "../LoadingSpinner";
import * as DexEndpoint from "../backend/dex";
import DexItemEntry from "../DexItemEntry";
import { Subscription } from "rxjs";
import dexService from "../backend/dex.service";
import DexUnknownEntry from "../DexUnknownEntry";
import { ItemEnum } from "../backend/dex";

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
            <Link to="/dex" className="dex-return"><span role="img" aria-label="Back">⬅</span> Return to Dex</Link>
            <div className="dex-header"><h1>Item Dex</h1></div>
            <div className="dex-container">{this.renderContainer()}</div>
        </>;
    }

    renderContainer = () => {
        if (this.state.state === "loading") return <LoadingSpinner />;
        else if (this.state.state === "error") return "ERROR";

        const { discoveredItems, lastItemIsDiscovered } = this.state.state;

        if (Object.entries(discoveredItems).length === 0) return "No items discovered yet.";

        const lastId = parseInt(Object.keys(discoveredItems).slice(-1).pop()!!);

        const allEntries: Record<number, ItemEnum | null> = {};
        for (let i = 0; i <= lastId; i++) {
            allEntries[i] = discoveredItems[i] || null;
        }

        return <ol className="dex">
            {Object.entries(allEntries)
                .map(([id, item]) => (item !== null) ? <DexItemEntry key={id} id={id} item={item} /> : <DexUnknownEntry key={id} id={id} />)
            }
        </ol>;
    };
}

export default DexItemsPage;
