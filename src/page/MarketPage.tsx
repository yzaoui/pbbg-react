import React from 'react';
import { Subscription } from "rxjs";
import "./MarketPage.css";
import marketService from "../backend/market.service";
import LoadingSpinner from "../component/LoadingSpinner";
import inventoryService from "../backend/inventory.service";
import { Inventory } from "../backend/inventory";
import { Market } from "../backend/market";

interface State {
    market: "loading" | Market;
    inventory: "loading" | Inventory;
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

        this.inventoryRequest = inventoryService.getInventory()
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
                    "Loaded!"
                }
            </div>
            <div className="inventory">
                <h2>Your inventory</h2>
                {this.state.inventory === "loading" ?
                    <LoadingSpinner />
                    :
                    "Loaded!"
                }
            </div>
        </div>;
    }
}

export default MarketPage;
