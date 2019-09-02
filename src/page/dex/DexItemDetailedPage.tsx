import React from "react";
import { BaseItem } from "../../backend/dex";
import { RouteComponentProps } from "react-router-dom";
import "./DexDetailedPage.css";
import LoadingSpinner from "../../component/LoadingSpinner";
import { Subscription } from "rxjs";
import dexService from "../../backend/dex.service";
import DexReturnLink from "../../component/dex/DexReturnLink";

interface Props extends RouteComponentProps<{ id: string }> {}

interface State {
    state: "loading" | "error" | BaseItem;
}

class DexItemDetailedPage extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        this.request = dexService.getItem(this.props.match.params.id)
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
            <DexReturnLink to="/dex/items" label="Return to Item Dex" />
            <div className="detailed-dex">{this.renderContainer()}</div>
        </>;
    }

    renderContainer = () => {
        if (this.state.state === "loading") return <div><LoadingSpinner /></div>;
        else if (this.state.state === "error") return <div>"ERROR"</div>;

        const item = this.state.state;

        return <>
            <h1>{item.friendlyName}</h1>
            <h2>Sprites</h2>
            <div className="body">
                <img src={item.imgURL} alt={`${item.friendlyName} sprite`} />
            </div>
            <h2>Description</h2>
            <div className="body">
                <i>{item.description}</i>
            </div>
        </>;
    };
}

export default DexItemDetailedPage;
