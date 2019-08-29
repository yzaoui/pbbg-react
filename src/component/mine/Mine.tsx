import React, { HTMLAttributes, MouseEventHandler, RefObject } from "react";
import "./Mine.css";
import { Mine as MineData } from "../../backend/mine";
import { InventoryEntry } from "../../backend/inventory";
import { isGridPreviewable } from "../../backend/dex";

interface Props extends HTMLAttributes<HTMLDivElement> {
    mine: MineData;
    pickaxe: InventoryEntry | null;
}

class Mine extends React.Component<Props> {
    tdRefs: RefObject<HTMLTableDataCellElement>[][];

    constructor(props: Props) {
        super(props);

        this.tdRefs = props.mine.cells.map(row => row.map(cell => React.createRef()));
    }

    render() {
        const { mine, pickaxe, ...rest } = this.props;
        const pickaxeLoaded = pickaxe !== null;

        return <div className="Mine" {...rest}>
            <table onMouseLeave={this.handleMineMouseLeave} {...(pickaxeLoaded ? { "data-can-mine": "" } : {})}>
                <tbody>
                {mine.cells.map((row, y) =>
                    <tr key={y}>
                        {row.map((cell, x) =>
                            <td key={x}
                                ref={this.tdRefs[y][x]}
                                {...(pickaxeLoaded ? { onMouseEnter: this.handleCellMouseEnter } : {})}
                                title={cell && cell.name}
                                data-x={x}
                                data-y={y}
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

    handleCellMouseEnter: MouseEventHandler<HTMLTableDataCellElement> = (event) => {
        const td = event.currentTarget;

        const x = parseInt(td.getAttribute("data-x")!!);
        const y = parseInt(td.getAttribute("data-y")!!);

        const basePickaxe = this.props.pickaxe!!.item.baseItem;
        if (!isGridPreviewable(basePickaxe)) throw Error();

        /* Remove all data-in-range attributes */
        this.clearInRangeFromAllCells();

        /* Add data-in-range for cells in range */
        basePickaxe.grid
            .map(point => ({ x: point.x + x, y: point.y + y })) // Project pickaxe cells onto mine grid
            .forEach(point => {
                // If this point is within bounds, set its data-in-range attribute
                if (point.x >= 0 && point.x < this.props.mine.width && point.y >= 0 && point.y < this.props.mine.height) {
                    this.tdRefs[point.y][point.x]!!.current!!.setAttribute("data-in-range", "");
                }
            });
    };

    handleMineMouseLeave: MouseEventHandler<HTMLTableElement> = (event) => {
        this.clearInRangeFromAllCells();
    };

    clearInRangeFromAllCells = () => this.tdRefs.forEach(row => row.forEach(cell => cell.current!!.removeAttribute("data-in-range")));
}

export default Mine;
