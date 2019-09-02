import React from "react";
import { UserStats } from "../backend/user";
import userService from "../backend/user.service";
import { Subscription } from "rxjs";
import LevelInfo from "../component/LevelInfo";
import goldSrc from "../img/gold.png";
import pickaxeSrc from "../img/pickaxe.png";

interface State {
    state: "loading" | "error" | UserStats
}

class IndexMemberPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        document.title = "Home - PBBG";

        this.request = userService.get()
            .subscribe(
                res => this.setState({ state: res.data }),
                error => this.setState({ state: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        if (this.state.state === "error") return "ERROR";
        else if (this.state.state === "loading") return "LOADING...";

        const { gold, mining } = this.state.state;

        return <>
            <div>
                <img src={goldSrc} alt="Gold icon" style={{ width: "16px", height: "16px" }} />
                Gold: {gold}
            </div>
            <div>
                <img src={pickaxeSrc} alt="Mining level icon" style={{ width: "16px", height: "16px" }} />
                Mining: <LevelInfo levelProgress={mining} />
            </div>
        </>;
    }
}

export default IndexMemberPage;
