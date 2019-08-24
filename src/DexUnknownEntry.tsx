import React from "react";
import "./page/DexSubpage.css"
import unknownImg from "./img/dex-unknown.png";

interface Props {
    id: string;
}

const DexUnknownEntry: React.FC<Props> = ({ id }) => <li className="entry-li">
    <div className="entry-container unknown-entry">
        <span>#{id}</span>
        <img src={unknownImg} alt={"Unknown entry"} />
        <span>------------------------</span>
    </div>
</li>;

export default DexUnknownEntry;
