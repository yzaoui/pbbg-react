import React from "react";
import "./MineLog.css";
import { LevelUp as LevelUpData, MineActionResult, MinedItemResult } from "../../backend/mine";

interface Props {
    results: MineActionResult[];
}

const MineLog: React.FC<Props> = ({ results }) => <ul className="MineLog">
    {results.map((result, i) => <>
        {result.minedItemResults.map((itemRes, j) => <ItemResult key={`res${i}-item${j}`} {...itemRes} />)}
        {result.levelUps.map((lvlUp, j) => <LevelUp key={`res${i}-lvl${j}`} {...lvlUp} />)}
    </>)}
</ul>;

const ItemResult: React.FC<MinedItemResult> = () => <li>item</li>;
const LevelUp: React.FC<LevelUpData> = () => <li>lvl up</li>;

export default MineLog;
