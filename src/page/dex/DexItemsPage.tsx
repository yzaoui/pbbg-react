import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import "./DexSubpage.scss";
import LoadingSpinner from "../../component/LoadingSpinner";
import { BaseItem, DexItems } from "../../backend/dex";
import DexItemEntry from "../../component/dex/DexItemEntry";
import { Subscription } from "rxjs";
import dexService from "../../backend/dex.service";
import DexUnknownEntry from "../../component/dex/DexUnknownEntry";
import DexReturnLink from "../../component/dex/DexReturnLink";
import DexItemDetailedPage from "./DexItemDetailedPage";

const DexItemsPage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={IndexPage} />
    <Route path={match.url + "/:id"} component={DexItemDetailedPage} />
</>;

interface State {
    state: "loading" | "error" | DexItems;
}

class IndexPage extends React.Component<RouteComponentProps, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        document.title = "Items - Dex - PBBG";

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
            <DexReturnLink to="/dex" label="Return to Dex"/>
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

        const allEntries: Record<number, BaseItem | null> = {};
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
