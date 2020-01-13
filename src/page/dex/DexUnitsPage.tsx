import React from "react";
import { DexUnits } from "../../backend/dex";
import { Route, RouteComponentProps } from "react-router-dom";
import "./DexSubpage.scss";
import LoadingSpinner from "../../component/LoadingSpinner";
import { Subscription } from "rxjs";
import dexService from "../../backend/dex.service";
import DexUnitEntry from "../../component/dex/DexUnitEntry";
import DexUnitDetailedPage from "./DexUnitDetailedPage";
import DexReturnLink from "../../component/dex/DexReturnLink";

const DexUnitsPage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={IndexPage} />
    <Route path={match.url + "/:id"} component={DexUnitDetailedPage} />
</>;

type State = {
    status: "loading";
} | {
    status: "error";
} | {
    status: "loaded";
    dexUnits: DexUnits;
};

class IndexPage extends React.Component<RouteComponentProps, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        document.title = "Units - Dex - PBBG";

        this.request = dexService.getUnits()
            .subscribe(
                res => this.setState({ status: "loaded", dexUnits: res.data }),
                error => this.setState({ status: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        return <>
            <DexReturnLink to="/dex" label="Return to Dex" />
            <div className="dex-header"><h1>Unit Dex</h1></div>
            <div className="dex-container">{this.renderContainer()}</div>
        </>;
    }

    renderContainer = () => {
        if (this.state.status === "loading") return <LoadingSpinner />;
        else if (this.state.status === "error") return "ERROR";

        const { discoveredUnits, lastUnitIsDiscovered } = this.state.dexUnits;

        let lastDiscoveredId = -1;

        return <ol className="dex units">
            {Object.entries(discoveredUnits)
                .map(([id, unit]) => <DexUnitEntry key={id} id={id} unit={unit} />)}
        </ol>;
    };
}

export default DexUnitsPage;
