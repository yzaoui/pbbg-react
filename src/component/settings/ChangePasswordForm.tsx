import React, { ChangeEventHandler, FormEventHandler } from "react";
import "./ChangePasswordForm.css"
import { PASSWORD_REGEX } from "../../helper/const";

interface State {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

class ChangePasswordForm extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    };

    render() {
        return <form className="ChangePasswordForm" onSubmit={this.handleSubmit}>
            <fieldset>
                <legend>Change Password</legend>
                <div>
                    <label htmlFor="current-password">Current Password:</label>
                    <input
                        type="password"
                        id="current-password"
                        onChange={this.handleCurrentPasswordChange}
                        value={this.state.currentPassword}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="new-password">New Password:</label>
                    <input
                        type="password"
                        id="new-password"
                        onChange={this.handleNewPasswordChange}
                        value={this.state.newPassword}
                        pattern={PASSWORD_REGEX.pattern}
                        title={PASSWORD_REGEX.description}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirm-new-password">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirm-new-password"
                        onChange={this.handleConfirmNewPasswordChange}
                        value={this.state.confirmNewPassword}
                        required
                    />
                </div>
                <button className="fancy" type="submit" disabled={!this.readyToSubmit()}>Save</button>
            </fieldset>
        </form>;
    }

    handleCurrentPasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => this.setState({ currentPassword: event.target.value });

    handleNewPasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => this.setState({ newPassword: event.target.value });

    handleConfirmNewPasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => this.setState({ confirmNewPassword: event.target.value });

    readyToSubmit = (): boolean => this.state.currentPassword !== "" && this.state.newPassword !== "" && this.state.confirmNewPassword === this.state.newPassword;

    handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
    };

}

export default ChangePasswordForm;
