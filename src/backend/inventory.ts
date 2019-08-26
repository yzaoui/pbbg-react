import { ItemEnum } from "./dex";

/**
 * /dex/inventory
 */
export interface EquipUnequipRequest {
    inventoryItemId: number;
}
export type InventoryResponse = Inventory

export interface Inventory {
    items: InventoryItem[];
    equipment: Equipment;
}

export interface Equipment {
    pickaxe?: Item;
}

export interface InventoryItem {
    id: number;
    item: Item;
}

export interface Item {
    baseItem: ItemEnum;
}

export interface Stackable {
    quantity: number;
}

export interface Equippable {
    equipped: boolean;
}

export interface GridPreviewable {
    grid: Point[];
}

export interface Point {
    x: number;
    y: number;
}

export const isStackable = (item: any): item is Stackable => item.hasOwnProperty("quantity") && typeof item["quantity"] === "number";
export const isEquippable = (item: any): item is Equippable => item.hasOwnProperty("equipped") && typeof item["equipped"] === "boolean";
export const isGridPreviewable = (item: any): item is GridPreviewable => item.hasOwnProperty("grid") && typeof item["grid"] === "object";
