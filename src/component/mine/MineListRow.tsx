import React from "react";
import { MineType } from "../../backend/mine";
import "./MineListRow.css";

interface Props {
    mineType: MineType;
    onEnterMineClick: () => void;
}

const MineListRow: React.FC<Props> = ({ mineType: { name, minLevel, bgURL }, onEnterMineClick }) => <tr className="MineListRow" style={{ backgroundImage: `url(${bgURL})` }}>
    <td>{name}</td>
    <td>{minLevel}</td>
    <td><button className="fancy" style={{ width: "100%" }} onClick={onEnterMineClick}>Enter</button></td>
</tr>;

export default MineListRow;
