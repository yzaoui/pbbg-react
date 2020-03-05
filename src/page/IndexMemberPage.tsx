import React from "react";
import { UserStats } from "../backend/user-stats";
import userStatsService from "../backend/user-stats.service";
import { Subscription } from "rxjs";
import HomeUserStats from "../component/HomeUserStats";

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

        this.request = userStatsService.get()
            .subscribe(
                res => this.setState({ status: "loaded", stats: res.data }),
                error => this.setState({ status: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        switch (this.state.status) {
            case "error": return <div>ERROR</div>;
            case "loading": return <HomeUserStats status="loading" />;
            case "loaded": return <HomeUserStats status="loaded" userStats={this.state.stats} />;
        }
    }
}

export default IndexMemberPage;
