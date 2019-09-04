import React from "react";
import { Battle as BattleData } from "../../backend/battle";
import BattleQueue from "./BattleQueue";
import PBBGUnit from "../PBBGUnit";
import "./Battle.css";
import BattleActions from "./BattleActions";
import BattleLog from "./BattleLog";

type Props = {
    battle: BattleData;
    onAllyTurn: (unitId: number) => void;
    onEnemyTurn: () => void;
    performingAction: boolean;
};

type State = {
    hoveredUnit: number | null;
    selectingEnemyTarget: boolean;
}

class Battle extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        hoveredUnit: null,
        selectingEnemyTarget: false
    };

    render() {
        const { battle, onEnemyTurn, performingAction } = this.props;
        const { hoveredUnit, selectingEnemyTarget } = this.state;
        const currentSide = battle.allies.some(ally => ally.id === battle.turns[0].unitId) ? "ally" : "enemy";

        return <div className="Battle" data-overlay-active={selectingEnemyTarget ? "" : undefined}>
            {selectingEnemyTarget &&
                this.createOverlay()
            }
            <BattleQueue battle={battle} onUnitEnter={this.handleUnitEnter} onUnitLeave={this.handleUnitLeave} hoveredUnit={hoveredUnit} />
            <div className="allies-container unit-list-section">
                <h1>Allies</h1>
                <ul>
                    {battle.allies.map(ally => <li key={ally.id}><PBBGUnit
                        unit={ally}
                        facing="right"
                        data-side="ally"
                        data-current-turn={ally.id === battle.turns[0].unitId ? "" : undefined}
                        onMouseEnter={() => this.handleUnitEnter(ally.id)}
                        onMouseLeave={this.handleUnitLeave}
                        {...(selectingEnemyTarget &&
                            { onClick: () => this.handleSelectTarget(ally.id) }
                        )}
                    /></li>)}
                </ul>
            </div>
            <div className="enemies-container unit-list-section">
                <h1>Enemies</h1>
                <ul>
                    {battle.enemies.map(enemy => <li key={enemy.id}><PBBGUnit
                        unit={enemy}
                        facing="left"
                        data-side="enemy"
                        data-current-turn={enemy.id === battle.turns[0].unitId ? "" : undefined}
                        onMouseEnter={() => this.handleUnitEnter(enemy.id)}
                        onMouseLeave={this.handleUnitLeave}
                        {...(selectingEnemyTarget &&
                            { onClick: () => this.handleSelectTarget(enemy.id) }
                        )}
                    /></li>)}
                </ul>
            </div>
            <BattleActions performingAction={performingAction} {...(currentSide === "ally" ? {
                enemyTurn: false,
                onProcessAllyTurn: this.handleAllyTurn
            } : {
                enemyTurn: true,
                onProcessEnemyTurn: onEnemyTurn
            })} />
            <BattleLog />
        </div>;
    }

    createOverlay = () => <div className="overlay">
        <div>
            <button className="fancy danger" onClick={this.handleCancelTargetting}>Cancel</button>
            <span>Select target</span>
        </div>
    </div>;

    handleUnitEnter = (unitId: number) => this.setState({ hoveredUnit: unitId });

    handleUnitLeave = () => this.setState({ hoveredUnit: null });

    handleAllyTurn = () => this.setState({ selectingEnemyTarget: true });

    handleSelectTarget = (unitId: number) => {
        this.setState({ selectingEnemyTarget: false });
        this.props.onAllyTurn(unitId);
    };

    handleCancelTargetting = () => this.setState({ selectingEnemyTarget: false });
}

export default Battle;
