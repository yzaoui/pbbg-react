import React from "react";
import { MyUnitEnum } from "../../backend/dex";
import { RouteComponentProps } from "react-router-dom";
import "./DexSubpage.css";
import "./DexUnitDetailedPage.css";
import LoadingSpinner from "../../component/LoadingSpinner";
import { Subscription } from "rxjs";
import dexService from "../../backend/dex.service";
import DexReturnLink from "../../component/dex/DexReturnLink";

interface Props extends RouteComponentProps<{ id: string }> {}

interface State {
    state: "loading" | "error" | MyUnitEnum;
}

class DexUnitDetailedPage extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        this.request = dexService.getUnit(this.props.match.params.id)
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
            <DexReturnLink to="/dex/units" label="Return to Unit Dex" />
            <div className="detailed-unit-dex">{this.renderContainer()}</div>
        </>;
    }

    renderContainer = () => {
        if (this.state.state === "loading") return <div><LoadingSpinner /></div>;
        else if (this.state.state === "error") return <div>"ERROR"</div>;

        const unit = this.state.state;

        return <>
            <h1>#{unit.id}: {unit.friendlyName}</h1>
            <h2>Sprites</h2>
            <div className="body">
                <img src={unit.iconURL} alt={`${unit.friendlyName}'s icon`} />
                <img src={unit.fullURL} alt={`${unit.friendlyName}'s full sprite`} />
            </div>
            <h2>Description</h2>
            <div className="body">
                <i>{unit.description}</i>
            </div>
        </>;
    };
}

export default DexUnitDetailedPage;
