import React from 'react';
import { Subscription } from "rxjs";
import "./MarketPage.css";
import marketService from "../backend/market.service";
import LoadingSpinner from "../component/LoadingSpinner";
import { Market } from "../backend/market";
import ForSale from "../component/market/ForSale";
import UserInventory from "../component/market/UserInventory";

interface State {
    gameMarket: "loading" | Market;
    userMarket: "loading" | Market;
    buying: boolean;
    selling: boolean;
}

class MarketPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        gameMarket: "loading",
        userMarket: "loading",
        buying: false,
        selling: false
    };

    marketRequest?: Subscription;
    inventoryRequest?: Subscription;

    componentDidMount() {
        this.marketRequest = marketService.getGameMarket()
            .subscribe(
                res => this.setState({ gameMarket: res.data }),
                error => console.log("error")
            );

        this.inventoryRequest = marketService.getUserMarket()
            .subscribe(
                res => this.setState({ userMarket: res.data }),
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
                {this.state.gameMarket === "loading" ?
                    <LoadingSpinner />
                    :
                    <ForSale
                        items={this.state.gameMarket.items}
                        buying={this.state.buying}
                        onBuy={this.handleBuy}
                    />
                }
            </div>
            <div className="inventory">
                <h2>Your inventory</h2>
                {this.state.userMarket === "loading" ?
                    <LoadingSpinner />
                    :
                    <UserInventory
                        items={this.state.userMarket.items}
                        selling={this.state.selling}
                        onSell={this.handleSell}
                    />
                }
            </div>
        </div>;
    }

    handleBuy = (ids: number[]) => {
        this.setState({ buying: true });

        marketService.buy({ orders: ids.map(id => ({ id: id })) })
            .subscribe(
                res => this.setState({ buying: false, gameMarket: res.data.gameMarket, userMarket: res.data.userMarket }),
                error => {}
            );
    };

    handleSell = (ids: number[]) => {
        this.setState({ selling: true });

        marketService.sell({ orders: ids.map(id => ({ id: id })) })
            .subscribe(
                res => this.setState({ selling: false, gameMarket: res.data.gameMarket, userMarket: res.data.userMarket }),
                error => {}
            );
    };
}

export default MarketPage;
