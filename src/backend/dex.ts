import { Point } from "./inventory";

/**
 * /dex/units
 */
export interface UnitsResponse {
    discoveredUnits: Record<number, MyUnitEnum>;
    lastUnitIsDiscovered: boolean;
}

/**
 * /dex/units/:id
 */
export type UnitIndividualResponse = MyUnitEnum;

/**
 * /dex/items
 */
export type ItemsResponse = DexItems;

/**
 * /dex/items/:id
 */
export type ItemIndividualResponse = BaseItem;

export interface DexItems {
    discoveredItems: {[id: number]: BaseItem};
    lastItemIsDiscovered: boolean;
}

export interface MyUnitEnum {
    id: number;
    friendlyName: string;
    description: string;
    iconURL: string;
    fullURL: string;
}

export interface BaseItem {
    friendlyName: string;
    imgURL: string;
    description: string;
}

export interface GridPreviewable {
    grid: Point[];
}

export const isGridPreviewable = (item: BaseItem): item is BaseItem & GridPreviewable => "grid" in item && typeof(item["grid"]) === "object" && item["grid"] !== null;
