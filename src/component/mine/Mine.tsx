import React, { HTMLAttributes } from "react";
import "./Mine.css";
import { Mine as MineData } from "../../backend/mine";

interface Props extends HTMLAttributes<HTMLDivElement> {
    mine: MineData;
}

const Mine: React.FC<Props> = ({ mine, ...rest }) => <div className="Mine" {...rest}>
    <table>
        <tbody>
        {mine.cells.map((row, y) =>
            <tr key={y}>
                {row.map((cell, x) =>
                    <td key={x}>
                        {cell && <img src={cell.imageURL} />}
                    </td>
                )}
            </tr>
        )}
        </tbody>
    </table>
</div>;

export default Mine;
