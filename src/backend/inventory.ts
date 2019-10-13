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
    pickaxe: InventoryEntry | null;
}

export interface InventoryEntry {
    item: MaterializedItem;
}

export interface MaterializedItem {
    id: number;
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
