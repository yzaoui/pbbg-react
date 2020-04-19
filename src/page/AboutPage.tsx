import React, { CSSProperties } from "react";
import "./AboutPage.scss";
import aboutService from "../backend/about.service";
import { Subscription } from "rxjs";
import LoadingSpinner from "../component/LoadingSpinner";

interface LoadingState {
    status: "loading";
}

interface LoadedState {
    status: "loaded";
    backendVersion: string;
}

type State = LoadingState | LoadedState;

class AboutPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    private request: Subscription | null = null;

    componentDidMount() {
        document.title = "Farm - PBBG";

        this.request = aboutService.getBackendVersion().subscribe(res =>
            this.setState({
                status: "loaded",
                backendVersion: res.data
            }));
    }

    componentWillUnmount() {
        this.request?.unsubscribe();
    }

    render() {
        return <div className="AboutPage">
            <div>Frontend version: <span className="version">{process.env.REACT_APP_VERSION}</span></div>
            <div>Backend version: {this.backendVersion()}</div>
        </div>;
    }

    private backendVersion = () => {
        switch (this.state.status) {
            case "loading":
                return <LoadingSpinner style={loadingStyle} />;
            case "loaded":
                return <span className="version">{this.state.backendVersion}</span>;
        }
    }
}

const loadingStyle: CSSProperties = {
    width: "18px",
    height: "18px",
    borderWidth: "4px"
};

export default AboutPage;
