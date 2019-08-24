import React from "react";
import { Link } from "react-router-dom";
import { ItemEnum } from "./backend/dex";
import "./DexEntry.css"

interface Props {
    id: string;
    item: ItemEnum;
}

const DexItemEntry: React.FC<Props> = ({ id, item }) => <li className="entry-li">
    <Link to={"/dex/items/" + id} className="entry-container">
        <span>#{id}</span>
        <img src={item.imgURL} alt={item.friendlyName + " sprite"} />
        <span>{item.friendlyName}</span>
    </Link>
</li>;

export default DexItemEntry;
