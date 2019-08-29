import React from "react";
import { InventoryEntry, isEquippable, isStackable } from "../../backend/inventory";
import "./InventoryItemTooltip.css";
import "../../common.css";

interface Props {
    inventoryEntry: InventoryEntry;
    equip?: () => void;
    unequip?: () => void;
    equipDisabled?: boolean;
}

const InventoryItemTooltip: React.FC<Props> = ({ inventoryEntry, equip, unequip, equipDisabled }) => <div className="InventoryItemTooltip">
    <div>{inventoryEntry.item.baseItem.friendlyName}</div>
    {isStackable(inventoryEntry.item) && <>
        <hr />
        <div>Quantity: {inventoryEntry.item.quantity}</div>
    </>}
    {isEquippable(inventoryEntry) && <>
        <hr />
        <button className="fancy" onClick={inventoryEntry.equipped ? unequip : equip} disabled={equipDisabled}>
            {inventoryEntry.equipped ? "Unequip" : "Equip"}
        </button>
    </>}
    <hr />
    <div><i>{inventoryEntry.item.baseItem.description}</i></div>
</div>;

export default InventoryItemTooltip;
