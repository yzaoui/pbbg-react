import React from 'react';
import { Subscription } from "rxjs";
import "./MarketPage.css";
import marketService from "../backend/market.service";
import LoadingSpinner from "../component/LoadingSpinner";
import { UserAndGameMarkets } from "../backend/market";
import ForSale from "../component/market/ForSale";
import UserInventory from "../component/market/UserInventory";
import goldSrc from "../img/gold.png";

interface State {
    markets: "loading" | UserAndGameMarkets;
    buying: boolean;
    selling: boolean;
}

class MarketPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        markets: "loading",
        buying: false,
        selling: false
    };

    request?: Subscription;

    componentDidMount() {
        this.request = marketService.getMarkets()
            .subscribe(
                res => this.setState({ markets: res.data }),
                error => console.log("error")
            );
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        return <div className="Market">
            <h1>Market</h1>
            <div className="gold">
                You have: {goldImg}{this.state.markets === "loading" ?
                    <LoadingSpinner style={{ width: "18px", height: "18px", borderWidth: "4px" }} />
                :
                    this.state.markets.gold
                }
            </div>
            <div className="for-sale">
                <h2>For sale</h2>
                {this.state.markets === "loading" ?
                    <LoadingSpinner />
                :
                    <ForSale
                        items={this.state.markets.gameMarket.items}
                        buying={this.state.buying}
                        onBuy={this.handleBuy}
                    />
                }
            </div>
            <div className="inventory">
                <h2>Your inventory</h2>
                {this.state.markets === "loading" ?
                    <LoadingSpinner />
                    :
                    <UserInventory
                        items={this.state.markets.userMarket.items}
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
                res => this.setState({ buying: false, markets: res.data }),
                error => {}
            );
    };

    handleSell = (ids: number[]) => {
        this.setState({ selling: true });

        marketService.sell({ orders: ids.map(id => ({ id: id })) })
            .subscribe(
                res => this.setState({ selling: false, markets: res.data }),
                error => {}
            );
    };
}

const goldImg = <img src={goldSrc} alt="Gold icon" style={{ width: "16px", height: "16px" }} />;

export default MarketPage;
