import React from "react";
import { Battle as BattleData } from "../../backend/battle";
import BattleQueue from "./BattleQueue";
import PBBGUnit from "../PBBGUnit";
import "./Battle.css";
import ActionInterface from "./ActionInterface";

type Props = {
    battle: BattleData;
    onAllyTurn: () => void;
    onEnemyTurn: () => void;
    performingAction: boolean;
};

type State = {
    hoveredUnit: number | null;
}

class Battle extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        hoveredUnit: null
    };

    render() {
        const { battle, onAllyTurn, onEnemyTurn, performingAction } = this.props;
        const currentSide = battle.allies.some(ally => ally.id === battle.turns[0].unitId) ? "ally" : "enemy";

        return <div className="Battle">
            <BattleQueue battle={battle} onUnitEnter={this.handleUnitEnter} onUnitLeave={this.handleUnitLeave} hoveredUnit={this.state.hoveredUnit} />
            <div className="unit-list-section">
                <h1>Allies</h1>
                <ul>
                    {battle.allies.map(ally => <li key={ally.id}><PBBGUnit
                        unit={ally}
                        facing="right"
                        data-side="ally"
                        data-current-turn={ally.id === battle.turns[0].unitId ? "" : undefined}
                    /></li>)}
                </ul>
            </div>
            <div className="unit-list-section">
                <h1>Enemies</h1>
                <ul>
                    {battle.enemies.map(enemy => <li key={enemy.id}><PBBGUnit
                        unit={enemy}
                        facing="left"
                        data-side="enemy"
                        data-current-turn={enemy.id === battle.turns[0].unitId ? "" : undefined}
                    /></li>)}
                </ul>
            </div>
            <ActionInterface performingAction={performingAction} {...(currentSide === "ally" ? {
                enemyTurn: false,
                onProcessAllyTurn: onAllyTurn
            } : {
                enemyTurn: true,
                onProcessEnemyTurn: onEnemyTurn
            })} />
        </div>;
    }

    handleUnitEnter = (unitId: number) => this.setState({ hoveredUnit: unitId });

    handleUnitLeave = (unitId: number) => this.setState({ hoveredUnit: null });
}

export default Battle;
