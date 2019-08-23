import React from "react";
import { Link } from "react-router-dom";
import { ItemEnum } from "./backend/dex";
import "./page/DexPage.css"

interface Props {
    id: string;
    item: ItemEnum;
}

const DexItemEntry: React.FC<Props> = ({ id, item }) => <li>
    <Link to={"/dex/items/" + id}>
        <span>#{id}</span>
        <img src={item.imgURL} alt={item.friendlyName + " sprite"} />
        <span>{item.friendlyName}</span>
    </Link>
</li>;

export default DexItemEntry;
