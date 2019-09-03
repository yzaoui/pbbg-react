import React from "react";
import { Battle as BattleData } from "../../backend/battle";

type Props = {
    battle: BattleData;
};

class Battle extends React.Component<Props> {
    render() {
        return <>{JSON.stringify(this.props)}</>;
    }
}

export default Battle;
