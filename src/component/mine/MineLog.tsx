import React from "react";
import "./MineLog.css";
import { LevelUp as LevelUpData, MinedItemResult } from "../../backend/mine";
import { isStackable } from "../../backend/inventory";

interface Props {
    results: (MinedItemResult | LevelUpData)[];
}

const MineLog: React.FC<Props> = ({ results }) => <ul className="MineLog">
    {results.map((result, i) => isMinedItemResult(result) ? <ItemResult key={i} {...result} /> : <LevelUp key={i} {...result} />)}
</ul>;

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

const isMinedItemResult =  (result: MinedItemResult | LevelUpData): result is MinedItemResult => "item" in result;

export default MineLog;
