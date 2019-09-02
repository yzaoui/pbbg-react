import React from "react";
import ChangePasswordForm from "../component/settings/ChangePasswordForm";
import VolumeSetting from "../component/settings/VolumeSetting";

class SettingsPage extends React.Component {
    componentDidMount() {
        document.title = "Settings - PBBG";
    }

    render() {
        return <>
            <ChangePasswordForm />
            <VolumeSetting />
        </>;
    }
}

export default SettingsPage;
