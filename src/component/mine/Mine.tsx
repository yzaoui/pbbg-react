import React, { DOMAttributes, HTMLAttributes } from "react";
import "./Mine.css";
import { Mine as MineData } from "../../backend/mine";
import { InventoryEntry, Point } from "../../backend/inventory";

interface Props extends HTMLAttributes<HTMLDivElement> {
    mine: MineData;
    pickaxe: InventoryEntry | null;
}

interface State {
    hoveredPoint: Point | null;
}

class Mine extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        hoveredPoint: null
    };

    render() {
        const { mine, pickaxe, ...rest } = this.props;
        const hasPickaxe = pickaxe !== null;

        return <div className="Mine" {...rest}>
            <table>
                <tbody>
                {mine.cells.map((row, y) =>
                    <tr key={y}>
                        {row.map((cell, x) =>
                            <td key={x}
                                {...(hasPickaxe ? this.hoverableAttributes(x, y) : {})}
                                title={cell && cell.name}
                            >
                                {cell && <img src={cell.imageURL} alt={cell.name + " sprite"} />}
                            </td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        </div>;
    }

    handleMouseEnter = (x: number, y: number) => {
        this.setState({ hoveredPoint: { x, y } });
    };

    handleMouseLeave = () => {
        this.setState({ hoveredPoint: null });
    };

    hoverableAttributes = (x: number, y: number): DOMAttributes<HTMLTableDataCellElement> => ({
        onMouseEnter: () => this.handleMouseEnter(x, y),
        onMouseLeave: this.handleMouseLeave
    })
}

export default Mine;
