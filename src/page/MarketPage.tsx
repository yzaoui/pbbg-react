import React from 'react';
import { Subscription } from "rxjs";
import "./MarketPage.css";
import marketService from "../backend/market.service";
import LoadingSpinner from "../component/LoadingSpinner";
import { Market } from "../backend/market";
import ForSale from "../component/market/ForSale";
import UserInventory from "../component/market/UserInventory";

interface State {
    market: "loading" | Market;
    inventory: "loading" | Market;
}

class MarketPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        market: "loading",
        inventory: "loading"
    };

    marketRequest?: Subscription;
    inventoryRequest?: Subscription;

    componentDidMount() {
        this.marketRequest = marketService.getMarket()
            .subscribe(
                res => this.setState({ market: res.data }),
                error => console.log("error")
            );

        this.inventoryRequest = marketService.getUserInventory()
            .subscribe(
                res => this.setState({ inventory: res.data }),
                error => console.log("error")
            );
    }

    componentWillUnmount() {
        this.marketRequest && this.marketRequest.unsubscribe();
        this.inventoryRequest && this.inventoryRequest.unsubscribe();
    }

    render() {
        return <div className="Market">
            <h1>Market</h1>
            <div className="for-sale">
                <h2>For sale</h2>
                {this.state.market === "loading" ?
                    <LoadingSpinner />
                    :
                    <ForSale items={this.state.market.items} />
                }
            </div>
            <div className="inventory">
                <h2>Your inventory</h2>
                {this.state.inventory === "loading" ?
                    <LoadingSpinner />
                    :
                    <UserInventory items={this.state.inventory.items} />
                }
            </div>
        </div>;
    }
}

export default MarketPage;
