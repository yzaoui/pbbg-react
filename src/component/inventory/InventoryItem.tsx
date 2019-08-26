import React from "react";
import "./InventoryItem.css";
import { isEquippable, isStackable, Item } from "../../backend/inventory";

interface Props {
    item: Item;
}

const InventoryItem: React.FC<Props> = ({ item }) => <div className="InventoryItem">
    <img src={item.baseItem.imgURL} alt={item.baseItem.friendlyName + " sprite"} />
    {isStackable(item) &&
        <span className="quantity">{item.quantity}</span>
    }
    {isEquippable(item) && item.equipped &&
        <span className="equipped" title="Currently equipped">E</span>
    }
</div>;

export default InventoryItem;
