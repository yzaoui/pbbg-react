import React, { ChangeEventHandler, FormEventHandler } from "react";
import "../page/LoginRegisterPage.css";

interface Props {
    onSubmit: (username: string, password: string) => void;
    submitting: boolean;
    error: boolean;
}

interface State {
    username: string;
    password: string;
}

class RegisterForm extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        username: "",
        password: ""
    };

    render() {
        return <form onSubmit={this.handleSubmit} className="LoginRegisterPage-form">
            <h1>Register your account</h1>
            {this.props.error && <div>ERROR</div>}
            <input
                type="text"
                required
                placeholder="Username"
                autoComplete="username"
                onChange={this.handleUsernameChange}
                value={this.state.username}
                disabled={this.props.submitting}
            />
            <input
                type="password"
                required
                placeholder="Password"
                autoComplete="new-password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
                disabled={this.props.submitting}
            />
            <button
                type="submit"
                disabled={this.props.submitting}>
                Register
            </button>
        </form>;
    }

    handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password);
    };

    handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({ username: event.target.value });
    };

    handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({ password: event.target.value });
    };
}

export default RegisterForm;
