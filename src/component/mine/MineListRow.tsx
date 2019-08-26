import React from "react";
import { MineType } from "../../backend/mine";

interface Props {
    mineType: MineType;
}

const MineListRow: React.FC<Props> = ({ mineType: { name, minLevel } }) => <tr>
    <td>{name}</td>
    <td>{minLevel}</td>
    <td><button className="fancy" style={{ width: "100%" }}>Enter</button></td>
</tr>;

export default MineListRow;
