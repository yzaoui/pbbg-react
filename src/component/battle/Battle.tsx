import React from "react";
import { Battle as BattleData } from "../../backend/battle";
import BattleQueue from "./BattleQueue";

type Props = {
    battle: BattleData;
};

type State = {
    hoveredUnit: number | null;
}

class Battle extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        hoveredUnit: null
    };

    render() {
        return <div>
            <BattleQueue battle={this.props.battle} onUnitEnter={this.handleUnitEnter} onUnitLeave={this.handleUnitLeave} hoveredUnit={this.state.hoveredUnit} />
        </div>;
    }

    handleUnitEnter = (unitId: number) => this.setState({ hoveredUnit: unitId });

    handleUnitLeave = (unitId: number) => this.setState({ hoveredUnit: null });
}

export default Battle;
