import React from "react";
import MineList from "../../component/mine/MineList";
import { MineTypeList } from "../../backend/mine";
import { Subscription } from "rxjs";
import mineService from "../../backend/mine.service";

interface State {
    state: "loading" | "error" | MineTypeList;
}

class IndexPage extends React.Component<{}, State> {
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
        // TODO: Implement
    };
}

export default IndexPage;
