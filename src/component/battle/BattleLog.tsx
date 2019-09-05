import React, { RefObject } from "react";
import "./BattleLog.css";
import { BattleReward, MappedUnitEffects } from "../../backend/battle";
import { SidedUnit } from "./Battle";
import HealthEffectResult from "./HealthEffectResult";

interface Props {
    effects: MappedUnitEffects[];
    reward: BattleReward | null;
    units: Map<number, SidedUnit>;
    onUnitNameEnter: (unitId: number) => void;
    onUnitNameLeave: (unitId: number) => void;
}

class BattleLog extends React.Component<Props> {
    olRef: RefObject<HTMLOListElement>;

    constructor(props: Props) {
        super(props);

        this.olRef = React.createRef();
    }

    render() {
        const { effects, reward, units, onUnitNameEnter, onUnitNameLeave } = this.props;

        return <div className="BattleLog">
            <h1>Log</h1>
            <div>
                <ol ref={this.olRef}>
                    {effects.map((mappedEffect, i) => Object.entries(mappedEffect).map(([id, effect]) => {
                        const unitId = parseInt(id);

                        return <HealthEffectResult
                            key={i}
                            unit={units.get(unitId)!}
                            effect={effect}
                            onUnitNameEnter={() => onUnitNameEnter(unitId)}
                            onUnitNameLeave={() => onUnitNameLeave(unitId)}
                        />;
                    }))}
                    {reward &&
                        <BattleRewardResult {...reward} />
                    }
                </ol>
            </div>
        </div>;
    }
}

const BattleRewardResult: React.FC<BattleReward> = () => <li>[reward]</li>;

export default BattleLog;
