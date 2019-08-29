import { BaseItem } from "./dex";

/**
 * /dex/inventory
 */
export interface EquipUnequipRequest {
    inventoryItemId: number;
}
export type InventoryResponse = Inventory

export interface Inventory {
    items: InventoryEntry[];
    equipment: Equipment;
}

export interface Equipment {
    pickaxe?: InventoryEntry;
}

export interface InventoryEntry {
    id: number;
    item: MaterializedItem;
}

export interface MaterializedItem {
    baseItem: BaseItem;
}

export interface Stackable {
    quantity: number;
}

export interface Equippable {
    equipped: boolean;
}

export interface Point {
    x: number;
    y: number;
}

export const isStackable = (item: MaterializedItem): item is MaterializedItem & Stackable => "quantity" in item && typeof(item["quantity"]) === "number";
export const isEquippable = (item: InventoryEntry): item is InventoryEntry & Equippable => "equipped" in item && typeof(item["equipped"]) === "boolean";
