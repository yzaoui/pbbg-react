import React from "react";
import * as DexEndpoint from "../../backend/dex";
import { Link, Route, RouteComponentProps } from "react-router-dom";
import "./DexSubpage.css";
import LoadingSpinner from "../../LoadingSpinner";
import { Subscription } from "rxjs";
import dexService from "../../backend/dex.service";
import DexUnitEntry from "../../DexUnitEntry";
import DexUnitDetailedPage from "./DexUnitDetailedPage";

type DexUnits = DexEndpoint.UnitsResponse;

const DexUnitsPage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={IndexPage} />
    <Route path={match.url + "/:id"} component={DexUnitDetailedPage} />
</>;

interface State {
    state: "loading" | "error" | DexUnits;
}

class IndexPage extends React.Component<RouteComponentProps, State> {
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
            <Link to="/dex" className="dex-return"><span role="img" aria-label="Back">⬅</span> Return to Dex</Link>
            <div className="dex-header"><h1>Unit Dex</h1></div>
            <div className="dex-container">{this.renderContainer()}</div>
        </>;
    }

    renderContainer = () => {
        if (this.state.state === "loading") return <LoadingSpinner />;
        else if (this.state.state === "error") return "ERROR";

        const { discoveredUnits, lastUnitIsDiscovered } = this.state.state;

        let lastDiscoveredId = -1;

        return <ol className="dex units">
            {Object.entries(discoveredUnits)
                .map(([id, unit]) => <DexUnitEntry key={id} id={id} unit={unit} />)}
        </ol>;
    };
}

export default DexUnitsPage;
