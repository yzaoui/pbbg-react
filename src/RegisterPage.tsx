import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginRegisterPage.css";
import RegisterForm from "./RegisterForm";

interface State {
    submitting: boolean;
    shouldRedirect: boolean;
}

class RegisterPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        submitting: false,
        shouldRedirect: false
    };

    render() {
        if (this.state.shouldRedirect) return <Redirect to="/" />;

        return <>
            <RegisterForm onSubmit={this.handleSubmit} submitting={this.state.submitting} />
            <Link to="/login" className="LoginRegisterPage-login-link">Existing user? Log in</Link>
        </>;
    }

    handleSubmit = (username: string, password: string) => {
        const form = new FormData();
        form.append("username", username);
        form.append("password", password);

        this.setState({ submitting: true });

        fetch("/register", {
            method: "POST",
            body: form
        }).then(res =>
            this.setState({ submitting: false, shouldRedirect: true })
        );
    };
}

export default RegisterPage;
