import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginRegisterPage.css";
import authenticationService from "./authentication.service";
import LoginForm from "./LoginForm";

interface State {
    submitting: boolean;
    error: boolean;
    redirectToRoot: boolean;
}

class LoginPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        submitting: false,
        error: false,
        redirectToRoot: authenticationService.currentUserValue !== null
    };

    render() {
        if (this.state.redirectToRoot) return <Redirect to="/" />;

        return <>
            <LoginForm onSubmit={this.handleSubmit} submitting={this.state.submitting} error={this.state.error} />
            <Link to="/register" className="LoginRegisterPage-login-link">New user? Register</Link>
        </>;
    }

    handleSubmit = (username: string, password: string) => {
        this.setState({ submitting: true });

        authenticationService.login(username, password)
            .then(
                res => this.setState({ redirectToRoot: true }),
                error => this.setState({ submitting: false, error: true })
            );
    };
}

export default LoginPage;
