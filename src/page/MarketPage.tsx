import React from 'react';
import { Subscription } from "rxjs";
import "./MarketPage.css";
import marketService from "../backend/market.service";
import LoadingSpinner from "../component/LoadingSpinner";
import { UserAndGameMarkets } from "../backend/market";
import GameMarket from "../component/market/GameMarket";
import UserMarket from "../component/market/UserMarket";
import goldSrc from "../img/gold.png";
import { Howl } from "howler";
// @ts-ignore
import transactionMP3 from "../audio/transaction.mp3";
// @ts-ignore
import transactionOGG from "../audio/transaction.ogg";

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

    transactionSound = new Howl({
        src: [transactionMP3, transactionOGG],
        preload: true
    });

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
                    <GameMarket
                        items={this.state.markets.gameMarket.items}
                        userGold={this.state.markets.gold}
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
                    <UserMarket
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
                res => {
                    this.transactionSound.play();
                    this.setState({ buying: false, markets: res.data });
                },
                error => {}
            );
    };

    handleSell = (ids: number[]) => {
        this.setState({ selling: true });

        marketService.sell({ orders: ids.map(id => ({ id: id })) })
            .subscribe(
                res => {
                    this.transactionSound.play();
                    this.setState({ selling: false, markets: res.data });
                },
                error => {}
            );
    };
}

const goldImg = <img src={goldSrc} alt="Gold icon" style={{ width: "16px", height: "16px" }} />;

export default MarketPage;
