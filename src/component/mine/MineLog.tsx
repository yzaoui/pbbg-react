import React from "react";
import "./MineLog.css";
import { LevelUp as LevelUpData, MineActionResult, MinedItemResult } from "../../backend/mine";
import { isStackable } from "../../backend/inventory";

interface Props {
    results: MineActionResult[];
}

const MineLog: React.FC<Props> = ({ results }) => <ul className="MineLog">
    {results.map((result, i) => <React.Fragment key={i}>
        {result.minedItemResults.map((itemRes, j) => <ItemResult key={`${i}-i${j}`} {...itemRes} />)}
        {result.levelUps.map((lvlUp, j) => <LevelUp key={`${i}-l${j}`} {...lvlUp} />)}
    </React.Fragment>)}
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

export default MineLog;
