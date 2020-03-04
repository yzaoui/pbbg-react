import React from "react";
import { RouteComponentProps } from "react-router";
import { Subscription } from "rxjs";
import userService from "../backend/user.service";
import { UserProfile } from "../backend/user";
import Helmet from "react-helmet";
import LoadingSpinner from "../component/LoadingSpinner";
import UserProfileComponent from "../component/UserProfileComponent";

interface Props extends RouteComponentProps<{ id: string }> {}

interface LoadingState {
    status: "loading";
}

interface LoadedState {
    status: "loaded";
    userProfile: UserProfile;
}

interface ErrorState {
    status: "error";
}

type State = LoadingState | LoadedState | ErrorState;

class UserPage extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        this.request = userService.getUserProfile(this.props.match.params.id)
            .subscribe(
                res => this.setState({ status: "loaded", userProfile: res.data }),
                error => this.setState({ status: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        switch (this.state.status) {
            case "loading": return <>
                <Helmet title="Loading… - User - PBBG" />
                <div><LoadingSpinner /></div>
            </>;
            case "loaded": return <>
                <Helmet title={`${this.state.userProfile.username} - User - PBBG`} />
                <UserProfileComponent userProfile={this.state.userProfile} />
            </>;
            case "error": return <div>ERROR</div>;
        }
    }
}

export default UserPage;
