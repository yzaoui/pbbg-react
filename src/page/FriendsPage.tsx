import React from "react";
import { RouteComponentProps } from "react-router";
import { Subscription } from "rxjs";
import friendsService from "../backend/friends.service";
import { Friends } from "../backend/friends";
import Helmet from "react-helmet";
import LoadingSpinner from "../component/LoadingSpinner";
import FriendsContainer from "../component/friends/FriendsContainer";
import "./FriendsPage.scss";

interface LoadingState {
    status: "loading";
}

interface LoadedState {
    status: "loaded";
    friends: Friends;
}

interface ErrorState {
    status: "error";
}

type State = LoadingState | LoadedState | ErrorState;

class FriendsPage extends React.Component<RouteComponentProps, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        this.request = friendsService.getFriends()
            .subscribe(
                res => this.setState({ status: "loaded", friends: res.data }),
                error => this.setState({ status: "error" })
            );
    }

    render = () => <div className="FriendsPage">
        <Helmet title="Friends - PBBG" />
        {this.renderContent()}
    </div>;

    renderContent = () => {
        switch (this.state.status) {
            case "loading": return <LoadingSpinner />;
            case "loaded": return <FriendsContainer match={this.props.match} friends={this.state.friends} />;
            case "error": return <span>ERROR</span>;
        }
    }
}

export default FriendsPage;
