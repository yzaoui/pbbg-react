import React, { HTMLAttributes } from "react";
import "./InventoryItem.css";
import { InventoryEntry, isEquippable, isStackable } from "../../backend/inventory";

interface Props extends HTMLAttributes<HTMLDivElement> {
    inventoryEntry: InventoryEntry;
}

const InventoryItem: React.FC<Props> = ({ inventoryEntry, ...rest }) => <div className="InventoryItem" {...rest}>
    <img src={inventoryEntry.item.baseItem.imgURL} alt={inventoryEntry.item.baseItem.friendlyName + " sprite"} />
    {isStackable(inventoryEntry.item) &&
        <span className="quantity">{inventoryEntry.item.quantity}</span>
    }
    {isEquippable(inventoryEntry) && inventoryEntry.equipped &&
        <span className="equipped" title="Currently equipped">E</span>
    }
</div>;

export default InventoryItem;
