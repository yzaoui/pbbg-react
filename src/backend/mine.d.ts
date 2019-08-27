/**
 * /mine
 */
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

export interface Mine {
    width: number;
    height: number;
    cells: MineCell[][];
}

export interface MineCell {
    imageURL: string;
}

export interface MineTypeList {
    types: MineType[];
    nextUnlockLevel?: number;
}

export interface MineType {
    id: number;
    name: string;
    minLevel: number;
}
