import React from "react";
import { BaseItem } from "../../backend/dex";
import { RouteComponentProps } from "react-router-dom";
import "./DexDetailedPage.scss";
import LoadingSpinner from "../../component/LoadingSpinner";
import { Subscription } from "rxjs";
import dexService from "../../backend/dex.service";
import DexReturnLink from "../../component/dex/DexReturnLink";
import { Helmet } from "react-helmet";

interface Props extends RouteComponentProps<{ id: string }> {}

type State = {
    status: "loading";
} | {
    status: "error";
} | {
    status: "loaded";
    baseItem: BaseItem;
};

class DexItemDetailedPage extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        this.request = dexService.getItem(this.props.match.params.id)
            .subscribe(
                res => this.setState({ status: "loaded", baseItem: res.data }),
                error => this.setState({ status: "error" })
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
        switch (this.state.status) {
            case "loading": return <>
                <Helmet title="Loading… - Item Dex - PBBG" />
                <div><LoadingSpinner /></div>
            </>;
            case "error": return <div>ERROR</div>;
        }

        const item = this.state.baseItem;

        return <>
            <Helmet title={`#${item.id}: ${item.friendlyName} - Item Dex - PBBG`} />
            <h1>#{item.id}: {item.friendlyName}</h1>
            <h2>Sprites</h2>
            <div className="body">
                <img className="item-sprite" src={item.img16} alt={`${item.friendlyName} 16x16 sprite`} />
                <img className="item-sprite" src={item.img32} alt={`${item.friendlyName} 32x32 sprite`} />
                <img className="item-sprite" src={item.img64} alt={`${item.friendlyName} 64x64 sprite`} />
            </div>
            <h2>Description</h2>
            <div className="body">
                <i>{item.description}</i>
            </div>
        </>;
    };
}

export default DexItemDetailedPage;
