/**
 * /mine
 */
import { MaterializedItem } from "./inventory";

export type MineResponse = Mine | null;

/**
 * /mine/types
 */
export type MineTypesResponse = MineTypeList;

/**
 * /mine/generate
 */
export type MineEnterRequest = {
    mineTypeId: number;
};
export type MineEnterResponse = Mine;

/**
 * /mine/exit
 */
export type MineExitResponse = Mine;

/**
 * /mine/perform
 */
export type MineActionRequest = {
    x: number;
    y: number;
};
export type MineActionResponse = MineActionResult;

export interface Mine {
    width: number;
    height: number;
    cells: MineCell[][];
}

export interface MineCell {
    name: string;
    imageURL: string;
}

export interface MineTypeList {
    types: MineType[];
    nextUnlockLevel: number | null;
}

export interface MineType {
    id: number;
    name: string;
    minLevel: number;
}

export interface MineActionResult {
    minedItemResults: MinedItemResult[];
    levelUps: LevelUp[]
}

export interface MinedItemResult {
    item: MaterializedItem;
    expPerIndividualItem: number;
}

export interface LevelUp {
    newLevel: number;
    additionalMessage: string | null;
}
