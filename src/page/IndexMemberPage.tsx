import React from "react";
import * as UserEndpoint from "../backend/user";
import userService from "../backend/user.service";

type UserDetails = UserEndpoint.Response

interface State {
    state: "loading" | "error" | UserDetails
}

class IndexMemberPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    componentDidMount() {
        userService.get()
            .then(
                res => this.setState({ state: res.data }),
                error => this.setState({ state: "error" })
            )
    }

    render() {
        if (this.state.state === "error") return "ERROR";
        else if (this.state.state === "loading") return "LOADING...";

        const { mining } = this.state.state;

        return <>
            Mining:
            <div className="level-info">
                <span>Lv. {mining.level} — {mining.relativeExp} / {mining.relativeExpToNextLevel}</span>
            </div>
        </>;
    }
}

export default IndexMemberPage;
