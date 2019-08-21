import React, { ChangeEventHandler, FormEventHandler } from "react";
import "./common.css";
import "./GuestNav.css";
import { Link } from "react-router-dom";
import authenticationService from "./authentication.service";
import history from "./helper/history";

interface State {
    submitting: boolean;
    username: string;
    password: string;
}

class GuestNav extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        submitting: false,
        username: "",
        password: ""
    };

    render() {
        return <nav className="sidebar sidebar-guest">
            <Link to="/">Index</Link>
            <form className="sidebar-login-form" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="username"
                    required
                    placeholder="Username"
                    autoComplete="username"
                    onChange={this.handleUsernameChange}
                    value={this.state.username}
                    disabled={this.state.submitting}
                />
                <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    autoComplete="current-password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    disabled={this.state.submitting}
                />
                <button type="submit" disabled={this.state.submitting}>Log in</button>
            </form>
        </nav>;
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<State>, snapshot?: any) {
        if (prevState.submitting && !this.state.submitting) {
            this.setState({ username: "", password: "" });
        }
    }

    handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        this.setState({ submitting: true });

        authenticationService.login(this.state.username, this.state.password)
            .catch(error => {
                this.setState({ submitting: false });
                history.push({ pathname: "/login", state: { error: true } });
            });
    };

    handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({ username: event.target.value });
    };

    handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({ password: event.target.value });
    };
}

export default GuestNav;
