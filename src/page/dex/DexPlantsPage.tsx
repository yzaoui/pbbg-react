import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import "./DexSubpage.scss";
import LoadingSpinner from "../../component/LoadingSpinner";
import { Subscription } from "rxjs";
import dexService from "../../backend/dex.service";
import DexPlantEntry from "../../component/dex/DexPlantEntry";
import DexPlantDetailedPage from "./DexPlantDetailedPage";
import DexReturnLink from "../../component/dex/DexReturnLink";
import { DexPlants } from "../../backend/dex";

const DexPlantsPage: React.FC<RouteComponentProps> = ({ match }) => <>
    <Route path={match.url + "/"} exact component={IndexPage} />
    <Route path={match.url + "/:id"} component={DexPlantDetailedPage} />
</>;

type State = {
    status: "loading";
} | {
    status: "error";
} | {
    status: "loaded";
    dexPlants: DexPlants;
};

class IndexPage extends React.Component<RouteComponentProps, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        document.title = "Plant Dex - PBBG";

        this.request = dexService.getPlants()
            .subscribe(
                res => this.setState({ status: "loaded", dexPlants: res.data }),
                error => this.setState({ status: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        return <>
            <DexReturnLink to="/dex" label="Return to Dex" />
            <div className="dex-header"><h1>Plant Dex</h1></div>
            <div className="dex-container">{this.renderContainer()}</div>
        </>;
    }

    renderContainer = () => {
        if (this.state.status === "loading") return <LoadingSpinner />;
        else if (this.state.status === "error") return "ERROR";

        return <ol className="dex plants">
            {Object.entries(this.state.dexPlants.discoveredPlants)
                .map(([id, plant]) => <DexPlantEntry key={id} id={id} plant={plant} />)}
        </ol>;
    };
}

export default DexPlantsPage;
