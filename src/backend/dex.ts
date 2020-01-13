import { Point } from "./inventory";

/**
 * /dex/items
 */
export type ItemsResponse = DexItems;

/**
 * /dex/items/:id
 */
export type ItemIndividualResponse = BaseItem;

/**
 * /dex/units
 */
export type UnitsResponse = DexUnits;

/**
 * /dex/units/:id
 */
export type UnitIndividualResponse = MyUnitEnum;

export interface DexItems {
    discoveredItems: {[id: number]: BaseItem};
    lastItemIsDiscovered: boolean;
}

export interface BaseItem {
    friendlyName: string;
    img16: string;
    img32: string;
    img64: string;
    description: string;
}

export interface GridPreviewable {
    grid: Point[];
}

export const isGridPreviewable = (item: BaseItem): item is BaseItem & GridPreviewable => "grid" in item && typeof(item["grid"]) === "object" && item["grid"] !== null;

export interface DexUnits {
    discoveredUnits: Record<number, MyUnitEnum>;
    lastUnitIsDiscovered: boolean;
}

export interface MyUnitEnum {
    id: number;
    friendlyName: string;
    description: string;
    iconURL: string;
    fullURL: string;
}
