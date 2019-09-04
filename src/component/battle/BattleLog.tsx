import React, { RefObject } from "react";
import "./BattleLog.css";
import { BattleReward, MappedUnitEffects } from "../../backend/battle";

interface Props {
    effects: MappedUnitEffects[];
    reward: BattleReward | null;
}

class BattleLog extends React.Component<Props> {
    olRef: RefObject<HTMLOListElement>;

    constructor(props: Props) {
        super(props);

        this.olRef = React.createRef();
    }

    render() {
        const { effects, reward } = this.props;

        return <div className="BattleLog">
            <h1>Log</h1>
            <div>
                <ol ref={this.olRef}>
                    {effectsList(effects)}
                    {reward &&
                        <BattleRewardResult {...reward} />
                    }
                </ol>
            </div>
        </div>;
    }
}

const effectsList = (effects: MappedUnitEffects[]) => {
    return effects.map((effect, i) => <UnitEffectResult key={i} />)
};

const BattleRewardResult: React.FC<BattleReward> = () => <li>[reward]</li>;

const UnitEffectResult: React.FC<MappedUnitEffects> = () => <li>[effect]</li>;

export default BattleLog;
