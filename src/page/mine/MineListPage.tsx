import React from "react";
import { RouteComponentProps } from "react-router-dom";
import MineList from "../../component/mine/MineList";
import { MineTypeList } from "../../backend/mine";
import { Subscription } from "rxjs";
import mineService from "../../backend/mine.service";

interface State {
    state: "loading" | "error" | MineTypeList;
}

class MineListPage extends React.Component<RouteComponentProps, State> {
    readonly state: Readonly<State> = {
        state: "loading"
    };

    request?: Subscription;

    componentDidMount() {
        this.request = mineService.getMineTypes()
            .subscribe(
                res => this.setState({ state: res.data }),
                error => this.setState({ state: "error" })
            )
    }

    componentWillUnmount() {
        this.request && this.request.unsubscribe();
    }

    render() {
        return <MineList state={this.state.state} onEnterMine={this.handleEnterMine} />;
    }

    handleEnterMine = (mineTypeId: number) => {
        this.request = mineService.enterMine({ mineTypeId })
            .subscribe(
                res => this.props.history.push({ pathname: "/mine", state: { mine: res.data } }),
                error => this.setState({ state: "error" })
            )
    };
}

export default MineListPage;
