import React from "react";
import * as UserEndpoint from "../backend/user";
import userService from "../backend/user.service";
import { Subscription } from "rxjs";
import PBBGLevelProgress from "../component/PBBGLevelProgress";
import "./IndexMemberPage.css"

type UserDetails = UserEndpoint.Response;

interface State {
    state: "loading" | "error" | UserDetails
}

class IndexMemberPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    componentDidMount() {
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

        const { mining } = this.state.state;

        return <>
            Mining:
            <div className="level-info">
                <PBBGLevelProgress level={mining.level} value={mining.relativeExp} max={mining.relativeExpToNextLevel} />
                <span>Lv. {mining.level} — {mining.relativeExp} / {mining.relativeExpToNextLevel}</span>
            </div>
        </>;
    }
}

export default IndexMemberPage;
