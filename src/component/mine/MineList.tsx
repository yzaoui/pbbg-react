import React from "react";
import "./MineList.css";
import LoadingSpinner from "../LoadingSpinner";
import { MineTypeList } from "../../backend/mine";
import MineListRow from "./MineListRow";
import MineListUnknownRow from "./MineListUnknownRow";

interface Props {
    state: "loading" | "error" | MineTypeList;
}

const MineList: React.FC<Props> = ({ state }) => <table className="MineList">
    <thead>
        <tr>
            <th>Mine name</th>
            <th>Minimum lvl.</th>
            <th>Enter mine</th>
        </tr>
    </thead>
    <tbody>
    {(() => {
        if (state === "loading") return <tr>
            <td colSpan={3}>
                <div style={{ display: "flex", justifyContent: "center" }}><LoadingSpinner /></div>
            </td>
        </tr>;

        else if (state === "error") return "ERROR";

        return <>
            {state.types.map(mineType => <MineListRow mineType={mineType} />)}
            {state.nextUnlockLevel !== undefined && <MineListUnknownRow nextUnlockLevel={state.nextUnlockLevel} />}
        </>;
    })()}
    </tbody>
</table>;

export default MineList;
