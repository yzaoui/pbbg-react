import React, { HTMLAttributes, MouseEventHandler, RefObject } from "react";
import "./Mine.css";
import { Mine as MineData } from "../../backend/mine";
import { InventoryEntry, Point } from "../../backend/inventory";
import { isGridPreviewable } from "../../backend/dex";

interface Props extends HTMLAttributes<HTMLDivElement> {
    mine: MineData;
    pickaxe: InventoryEntry | null;
    submittingAction: Point | null;
    onMineAction: (x: number, y: number) => void;
}

class Mine extends React.Component<Props> {
    tdRefs: RefObject<HTMLTableDataCellElement>[][];

    constructor(props: Props) {
        super(props);

        this.tdRefs = props.mine.cells.map(row => row.map(cell => React.createRef()));
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        if (prevProps.submittingAction !== null && this.props.submittingAction === null) {
            this.clearAttributeFromAllCells("data-submitting");
        }
    }

    render() {
        const { mine, pickaxe, submittingAction, onMineAction, ...rest } = this.props;
        const pickaxeLoaded = pickaxe !== null;
        const isSubmittingAction = submittingAction !== null;

        return <div className="Mine" {...(pickaxeLoaded && !isSubmittingAction ? { "data-can-mine": "", onMouseLeave: this.handleMineMouseLeave } :
            isSubmittingAction ? { "data-submitting": "" } : {})} {...rest}>
            <table>
                <tbody>
                {mine.cells.map((row, y) =>
                    <tr key={y}>
                        {row.map((cell, x) =>
                            <td key={x}
                                ref={this.tdRefs[y][x]}
                                {...(pickaxeLoaded ? { onMouseEnter: this.handleCellMouseEnter } : {})}
                                {...(pickaxeLoaded && !isSubmittingAction ? { onClick: this.handleCellClick } : {})}
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

    handleCellMouseEnter: MouseEventHandler<HTMLTableDataCellElement> = ({ currentTarget: td }) => {
        const x = parseInt(td.getAttribute("data-x")!!);
        const y = parseInt(td.getAttribute("data-y")!!);

        const basePickaxe = this.props.pickaxe!!.item.baseItem;
        if (!isGridPreviewable(basePickaxe)) throw Error();

        /* Remove all data-in-range attributes */
        this.clearAttributeFromAllCells("data-in-range");

        /* Add data-in-range for cells in range */
        this.setAttributeToInRangeCells("data-in-range", basePickaxe.grid, { x, y });
    };

    handleMineMouseLeave: MouseEventHandler<HTMLTableElement> = (event) => {
        this.clearAttributeFromAllCells("data-in-range");
    };

    handleCellClick: MouseEventHandler<HTMLTableDataCellElement> = ({ currentTarget: td }) => {
        const x = parseInt(td.getAttribute("data-x")!!);
        const y = parseInt(td.getAttribute("data-y")!!);

        const basePickaxe = this.props.pickaxe!!.item.baseItem;
        if (!isGridPreviewable(basePickaxe)) throw Error();

        this.setAttributeToInRangeCells("data-submitting", basePickaxe.grid, { x, y });

        this.props.onMineAction(x, y);
    };

    clearAttributeFromAllCells = (attribute: "data-in-range" | "data-submitting") =>
        this.tdRefs.forEach(row => row.forEach(cell => cell.current!!.removeAttribute(attribute)));

    setAttributeToInRangeCells = (attribute: "data-in-range" | "data-submitting", grid: Point[], target: Point) => grid
        .map(point => ({ x: point.x + target.x, y: point.y + target.y })) // Project pickaxe cells onto mine grid
        .forEach(point => {
            // If this point is within bounds, set its data-in-range attribute
            if (point.x >= 0 && point.x < this.props.mine.width && point.y >= 0 && point.y < this.props.mine.height) {
                this.tdRefs[point.y][point.x]!!.current!!.setAttribute(attribute, "");
            }
        });
}

export default Mine;
