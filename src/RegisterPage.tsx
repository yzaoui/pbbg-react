import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginRegisterPage.css";
import RegisterForm from "./RegisterForm";
import authenticationService from "./authentication.service";

interface State {
    submitting: boolean;
    error: boolean;
    redirectToRoot: boolean;
}

class RegisterPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        submitting: false,
        error: false,
        redirectToRoot: authenticationService.currentUserValue !== null
    };

    render() {
        if (this.state.redirectToRoot) return <Redirect to="/" />;

        return <>
            <RegisterForm onSubmit={this.handleSubmit} submitting={this.state.submitting} error={this.state.error} />
            <Link to="/login" className="LoginRegisterPage-login-link">Existing user? Log in</Link>
        </>;
    }

    handleSubmit = (username: string, password: string) => {
        this.setState({ submitting: true });

        authenticationService.register(username, password)
            .then(
                res => this.setState({ redirectToRoot: true }),
                error => this.setState({ submitting: false, error: true })
            );
    };
}

export default RegisterPage;
