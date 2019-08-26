import React from "react";
import { isEquippable, isStackable, Item } from "../../backend/inventory";
import "./InventoryItemTooltip.css";
import "../../common.css";

interface Props {
    item: Item;
    equip?: () => void;
    unequip?: () => void;
    equipDisabled?: boolean;
}

const InventoryItemTooltip: React.FC<Props> = ({ item, equip, unequip, equipDisabled }) => <div className="InventoryItemTooltip">
    <div>{item.baseItem.friendlyName}</div>
    {isStackable(item) && <>
        <hr />
        <div>Quantity: {item.quantity}</div>
    </>}
    {isEquippable(item) && <>
        <hr />
        <button className="fancy" onClick={item.equipped ? unequip : equip} disabled={equipDisabled}>
            {item.equipped ? "Unequip" : "Equip"}
        </button>
    </>}
    <hr />
    <div><i>{item.baseItem.description}</i></div>
</div>;

export default InventoryItemTooltip;
