import React from "react";
import { isEquippable, isStackable, Item } from "../../backend/inventory";
import "./InventoryItemTooltip.css";

interface Props {
    item: Item;
    equip?: () => void;
    unequip?: () => void;
}

const InventoryItemTooltip: React.FC<Props> = ({ item, equip, unequip }) => <div className="InventoryItemTooltip">
    <div>{item.baseItem.friendlyName}</div>
    {isStackable(item) && <>
        <hr />
        <div>Quantity: {item.quantity}</div>
    </>}
    {isEquippable(item) && <>
        <hr />
        <button onClick={item.equipped ? unequip : equip}>
            {item.equipped ? "Unequip" : "Equip"}
        </button>
    </>}
    <hr />
    <div><i>{item.baseItem.description}</i></div>
</div>;

export default InventoryItemTooltip;
