import React from "react";
import { Link } from "react-router-dom";
import "./LoginRegisterPage.css";
import authenticationService from "./../authentication.service";
import LoginForm from "./../LoginForm";

interface State {
    submitting: boolean;
    error: boolean;
}

class LoginPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        submitting: false,
        error: false
    };

    render() {
        return <>
            <LoginForm onSubmit={this.handleSubmit} submitting={this.state.submitting} error={this.state.error} />
            <Link to="/register" className="LoginRegisterPage-login-link">New user? Register</Link>
        </>;
    }

    handleSubmit = (username: string, password: string) => {
        this.setState({ submitting: true });

        authenticationService.login(username, password)
            .catch(error => this.setState({ submitting: false, error: true }));
    };
}

export default LoginPage;
