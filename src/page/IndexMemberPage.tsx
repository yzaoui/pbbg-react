import React, { CSSProperties } from "react";
import { UserStats } from "../backend/user";
import userService from "../backend/user.service";
import { Subscription } from "rxjs";
import LevelInfo from "../component/LevelInfo";
import goldSrc from "../img/gold.png";
import lvlMiningSrc from "../img/lvl-mining.png";
import lvlFarmingSrc from "../img/lvl-farming.png";
import LoadingSpinner from "../component/LoadingSpinner";

type State = {
    status: "loading";
} | {
    status: "error";
} | {
    status: "loaded";
    stats: UserStats;
};

class IndexMemberPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        document.title = "Home - PBBG";

        this.request = userService.get()
            .subscribe(
                res => this.setState({ status: "loaded", stats: res.data }),
                error => this.setState({ status: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        if (this.state.status === "error") return "ERROR";

        return <>
            <div>
                <img src={goldSrc} alt="Gold icon" style={{ width: "16px", height: "16px" }} />
                Gold: {this.state.status === "loaded" ? this.state.stats.gold : <LoadingSpinner style={loadingStyle} /> }
            </div>
            <div>
                <img src={lvlMiningSrc} alt="Mining level icon" style={{ width: "16px", height: "16px" }} />
                Mining: {this.state.status === "loaded" ? <LevelInfo levelProgress={this.state.stats.mining} /> : <LoadingSpinner style={loadingStyle} />}
            </div>
            <div>
                <img src={lvlFarmingSrc} alt="Farming level icon" style={{ width: "16px", height: "16px" }} />
                Farming: {this.state.status === "loaded" ? <LevelInfo levelProgress={this.state.stats.farming} /> : <LoadingSpinner style={loadingStyle} />}
            </div>
        </>;
    }
}

const loadingStyle: CSSProperties = {
    width: "18px",
    height: "18px",
    borderWidth: "4px"
};

export default IndexMemberPage;
