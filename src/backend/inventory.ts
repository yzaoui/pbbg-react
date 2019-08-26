import { ItemEnum } from "./dex";

/**
 * /dex/inventory
 */
export type InventoryResponse = Inventory

export interface Inventory {
    items: InventoryItem[];
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

export const isStackable = (item: any): item is Stackable => item.hasOwnProperty("quantity");
export const isEquippable = (item: any): item is Equippable => item.hasOwnProperty("equipped");
export const isGridPreviewable = (item: any): item is GridPreviewable => item.hasOwnProperty("grid");
