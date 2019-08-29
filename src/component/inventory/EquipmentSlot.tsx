import React, { CSSProperties } from "react";
import "./EquipmentSlot.css";
import { InventoryEntry } from "../../backend/inventory";
import classNames from "classnames";

interface Props {
    item?: InventoryEntry;
    style?: CSSProperties
}

const EquipmentSlot: React.FC<Props> = ({ item, style, children }) => <div className={classNames("EquipmentSlot", { "equipped": item })} style={style}>
    {item ? <img src={item.item.baseItem.imgURL} alt={item.item.baseItem.friendlyName + " sprite"} /> : children}
</div>;

export default EquipmentSlot;
