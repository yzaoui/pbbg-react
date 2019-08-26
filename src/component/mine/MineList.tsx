import React from "react";
import "./MineList.css";
import LoadingSpinner from "../LoadingSpinner";
import { MineTypeList } from "../../backend/mine";

interface Props {
    state: "loading" | "error" | MineTypeList
}

const MineList: React.FC<Props> = ({ state }) => <table className="MineList">
    <thead>
        <tr>
            <th>Mine name</th>
            <th>Minimum lvl.</th>
            <th>Generate mine</th>
        </tr>
    </thead>
    <tbody>
    {state === "loading" &&
        <tr>
            <td colSpan={3}>
                <div style={{ display: "flex", justifyContent: "center" }}><LoadingSpinner /></div>
            </td>
        </tr>
    }
    </tbody>
</table>;

export default MineList;
