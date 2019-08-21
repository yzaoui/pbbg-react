import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import "./LoginRegisterPage.css";
import authenticationService from "./../authentication.service";
import LoginForm from "./../LoginForm";

interface State {
    submitting: boolean;
    error: boolean;
}

class LoginPage extends React.Component<RouteComponentProps, State> {
    readonly state: Readonly<State> = {
        submitting: false,
        error: false
    };

    render() {
        const error = (this.props.location.state && this.props.location.state.error) || this.state.error;

        return <>
            <LoginForm onSubmit={this.handleSubmit} submitting={this.state.submitting} error={error} />
            <Link to="/register" className="LoginRegisterPage-login-link">New user? Register</Link>
        </>;
    }

    handleSubmit = (username: string, password: string) => {
        this.setState({ submitting: true });

        authenticationService.login(username, password)
            .then(
                token => {
                    const referrer = this.props.location.state && this.props.location.state.from;
                    this.props.history.push(referrer || { pathname: "/" });
                },
                error => this.setState({ submitting: false, error: true })
            );
    };
}

export default LoginPage;
