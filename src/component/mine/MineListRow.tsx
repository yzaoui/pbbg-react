import React from "react";
import { MineType } from "../../backend/mine";

interface Props {
    mineType: MineType;
    onEnterMineClick: () => void;
}

const MineListRow: React.FC<Props> = ({ mineType: { name, minLevel }, onEnterMineClick }) => <tr>
    <td>{name}</td>
    <td>{minLevel}</td>
    <td><button className="fancy" style={{ width: "100%" }} onClick={onEnterMineClick}>Enter</button></td>
</tr>;

export default MineListRow;
