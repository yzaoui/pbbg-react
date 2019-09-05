import React from "react";
import { Battle as BattleData, BattleReward, MappedUnitEffects } from "../../backend/battle";
import BattleQueue from "./BattleQueue";
import PBBGUnit from "../PBBGUnit";
import "./Battle.css";
import BattleActions from "./BattleActions";
import BattleLog from "./BattleLog";
import { MyUnit } from "../../backend/squad";

export type SidedUnit = MyUnit & { side: "ally" | "enemy" };

type Props = {
    battle: BattleData;
    onAllyTurn: (unitId: number) => void;
    onEnemyTurn: () => void;
    performingAction: boolean;
    effects: MappedUnitEffects[];
    reward: BattleReward | null;
};

type State = {
    hoveredUnitId: number | null;
    selectingTarget: boolean;
}

class Battle extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        hoveredUnitId: null,
        selectingTarget: false
    };

    render() {
        const { battle, onEnemyTurn, performingAction, effects, reward } = this.props;
        const { hoveredUnitId, selectingTarget } = this.state;
        const battleIsOver = reward !== null;
        const nextUnitId = battle.turns[0].unitId;
        const currentSide = battle.allies.some(ally => nextUnitId === ally.id) ? "ally" : "enemy";

        return <div className="Battle" data-overlay-active={selectingTarget ? "" : undefined} data-battle-over={battleIsOver ? "" : undefined}>
            {selectingTarget &&
                this.createOverlay()
            }
            {!battleIsOver &&
                <BattleQueue battle={battle} onUnitEnter={this.handleUnitEnter} onUnitLeave={this.handleUnitLeave} hoveredUnit={hoveredUnitId} />
            }
            <div className="allies-container unit-list-section">
                <h1>Allies</h1>
                <ul>
                    {battle.allies.map(ally => <li key={ally.id}><PBBGUnit
                        unit={ally}
                        facing="right"
                        data-side="ally"
                        data-current-turn={ally.id === nextUnitId ? "" : undefined}
                        data-hovered={ally.id === hoveredUnitId ? "" : undefined}
                        onMouseEnter={() => this.handleUnitEnter(ally.id)}
                        onMouseLeave={this.handleUnitLeave}
                        {...(selectingTarget && ally.id !== nextUnitId && ally.hp > 0 &&
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
                        data-current-turn={enemy.id === nextUnitId ? "" : undefined}
                        data-hovered={enemy.id === hoveredUnitId ? "" : undefined}
                        onMouseEnter={() => this.handleUnitEnter(enemy.id)}
                        onMouseLeave={this.handleUnitLeave}
                        {...(selectingTarget && enemy.id !== nextUnitId && enemy.hp > 0 &&
                            { onClick: () => this.handleSelectTarget(enemy.id) }
                        )}
                    /></li>)}
                </ul>
            </div>
            {!battleIsOver &&
                <BattleActions performingAction={performingAction} {...(currentSide === "ally" ? {
                    enemyTurn: false,
                    onProcessAllyTurn: this.handleAllyTurn
                } : {
                    enemyTurn: true,
                    onProcessEnemyTurn: onEnemyTurn
                })} />
            }
            <BattleLog effects={effects} reward={reward} onUnitNameEnter={this.handleUnitEnter} onUnitNameLeave={this.handleUnitLeave} units={new Map(
                battle.allies.map(ally => ({ ...ally, side: "ally" }) as SidedUnit)
                    .concat(battle.enemies.map(enemy => ({ ...enemy, side: "enemy" }) as SidedUnit))
                    .map(unit => [unit.id, unit])
            )} />
        </div>;
    }

    createOverlay = () => <div className="overlay">
        <div>
            <button className="fancy danger" onClick={this.handleCancelTargeting}>Cancel</button>
            <span>Select target</span>
        </div>
    </div>;

    handleUnitEnter = (unitId: number) => this.setState({ hoveredUnitId: unitId });

    handleUnitLeave = () => this.setState({ hoveredUnitId: null });

    handleAllyTurn = () => this.setState({ selectingTarget: true });

    handleSelectTarget = (unitId: number) => {
        this.setState({ selectingTarget: false });
        this.props.onAllyTurn(unitId);
    };

    handleCancelTargeting = () => this.setState({ selectingTarget: false });
}

export default Battle;