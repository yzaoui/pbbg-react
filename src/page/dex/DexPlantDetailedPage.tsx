import React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./DexDetailedPage.scss";
import LoadingSpinner from "../../component/LoadingSpinner";
import { Subscription } from "rxjs";
import dexService from "../../backend/dex.service";
import DexReturnLink from "../../component/dex/DexReturnLink";
import { BasePlant, basePlantFromJSON, isMaturableBasePlant } from "../../model/farm";

interface Props extends RouteComponentProps<{ id: string }> {}

type State = {
    status: "loading";
} | {
    status: "error";
} | {
    status: "loaded";
    basePlant: BasePlant;
};

class DexPlantDetailedPage extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        this.request = dexService.getPlant(this.props.match.params.id)
            .subscribe(
                res => this.setState({ status: "loaded", basePlant: basePlantFromJSON(res.data) }),
                error => this.setState({ status: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        return <>
            <DexReturnLink to="/dex/plants" label="Return to Plant Dex" />
            <div className="detailed-dex">{this.renderContainer()}</div>
        </>;
    }

    renderContainer = () => {
        switch (this.state.status) {
            case "loading": return <div><LoadingSpinner /></div>;
            case "error": return <div>"ERROR"</div>;
        }

        const plant = this.state.basePlant;

        return <>
            <h1>#{plant.id}: {plant.name}</h1>
            <h2>Sprites</h2>
            <div className="body">
                <img src={plant.growingSprite} alt={`${plant.name} growing phase`} />
                {isMaturableBasePlant(plant) &&
                    <img src={plant.matureSprite} alt={`${plant.name} mature phase`} />
                }
            </div>
            <h2>Description</h2>
            <div className="body">
                <i>{plant.description}</i>
            </div>
        </>;
    };
}

export default DexPlantDetailedPage;
