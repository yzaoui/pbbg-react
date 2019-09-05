import React, { RefObject } from "react";
import "./BattleLog.css";
import { BattleReward, HealthEffect, MappedUnitEffects } from "../../backend/battle";
import { SidedUnit } from "./Battle";

interface Props {
    effects: MappedUnitEffects[];
    reward: BattleReward | null;
    units: Map<number, SidedUnit>;
}

class BattleLog extends React.Component<Props> {
    olRef: RefObject<HTMLOListElement>;

    constructor(props: Props) {
        super(props);

        this.olRef = React.createRef();
    }

    render() {
        const { effects, reward, units } = this.props;

        return <div className="BattleLog">
            <h1>Log</h1>
            <div>
                <ol ref={this.olRef}>
                    {effectsList(effects, units)}
                    {reward &&
                        <BattleRewardResult {...reward} />
                    }
                </ol>
            </div>
        </div>;
    }
}

const effectsList = (mappedEffectsList: MappedUnitEffects[], units: Map<number, SidedUnit>) => {
    return mappedEffectsList.map((mappedEffect, i) => Object.entries(mappedEffect).map(([id, effect]) => <HealthEffectResult key={i} unit={units.get(parseInt(id))!} effect={effect} />))
};

const BattleRewardResult: React.FC<BattleReward> = () => <li>[reward]</li>;

const HealthEffectResult: React.FC<{ unit: SidedUnit, effect: HealthEffect }> = ({ unit, effect }) => <li className="HealthEffectResult">
    <span className={unit.side}>{unit.name}</span> took <span className="damage">{-effect.delta}</span> damage
</li>;

export default BattleLog;
