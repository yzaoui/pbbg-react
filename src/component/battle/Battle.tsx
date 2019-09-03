import React from "react";
import { Battle as BattleData } from "../../backend/battle";
import BattleQueue from "./BattleQueue";

type Props = {
    battle: BattleData;
};

class Battle extends React.Component<Props> {
    render() {
        return <div>
            <BattleQueue battle={this.props.battle} />
        </div>;
    }
}

export default Battle;
