import React, { CSSProperties } from "react";
import "./EquipmentSlot.css";
import { Item } from "../../backend/inventory";
import classNames from "classnames";

interface Props {
    item?: Item;
    style?: CSSProperties
}

const EquipmentSlot: React.FC<Props> = ({ item, style, children }) => <div className={classNames("EquipmentSlot", { "equipped": item })} style={style}>
    {item ? <img src={item.baseItem.imgURL} alt={item.baseItem.friendlyName + " sprite"} /> : children}
</div>;

export default EquipmentSlot;
