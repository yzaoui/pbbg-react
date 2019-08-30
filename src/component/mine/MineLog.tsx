import React, { RefObject } from "react";
import "./MineLog.css";
import { LevelUp as LevelUpData, MinedItemResult } from "../../backend/mine";
import { isStackable } from "../../backend/inventory";
import classNames from "classnames";

interface Props {
    results: (MinedItemResult | LevelUpData)[];
    expanded?: boolean;
}

class MineLog extends React.Component<Props> {
    ulRef: RefObject<HTMLUListElement>;

    constructor(props: Props) {
        super(props);

        this.ulRef = React.createRef();
    }

    render() {
        return <ul className={classNames("MineLog", { "expanded": this.props.expanded })} ref={this.ulRef}>
            {this.props.results.map((result, i) => this.isMinedItemResult(result) ? <ItemResult key={i} {...result} /> : <LevelUp key={i} {...result} />)}
        </ul>;
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        if (prevProps.results.length !== this.props.results.length) {
            this.ulRef.current!!.scrollTop = this.ulRef.current!!.scrollHeight;
        }
    }

    isMinedItemResult = (result: MinedItemResult | LevelUpData): result is MinedItemResult => "item" in result;
}

const ItemResult: React.FC<MinedItemResult> = ({ item, expPerIndividualItem }) => <li className="ItemResult">
    {isStackable(item) ?
        <>Obtained <img src={item.baseItem.imgURL} alt={item.baseItem.friendlyName + " sprite"} />[{item.baseItem.friendlyName}] ×{item.quantity} (+{expPerIndividualItem * item.quantity} exp)</>
        :
        <>Obtained {item.baseItem.friendlyName} (+{expPerIndividualItem} exp)</>
    }
</li>;

const LevelUp: React.FC<LevelUpData> = ({ newLevel, additionalMessage }) => <li className="LevelUp">
    <>Mining level increased to level {newLevel}!{additionalMessage !== null ? ` ${additionalMessage}` : ""}</>
</li>;

export default MineLog;
