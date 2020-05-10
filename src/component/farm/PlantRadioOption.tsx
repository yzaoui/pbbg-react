import React, { ChangeEventHandler } from "react";
import InventoryItem from "../inventory/InventoryItem";
import { InventoryEntry } from "../../backend/inventory";
import styles from "./PlantRadioOption.module.scss";

type Props = {
    inventoryEntry: InventoryEntry;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

const PlantRadioOption: React.FC<Props> = ({ inventoryEntry, checked, onChange }) => <div className={styles.PlantRadioOption}>
    <input type="radio" name="plant" value={inventoryEntry.item.id} checked={checked} onChange={onChange} />
    <InventoryItem inventoryEntry={inventoryEntry} />
    <span>{inventoryEntry.item.baseItem.friendlyName}</span>
</div>;

export default PlantRadioOption;
