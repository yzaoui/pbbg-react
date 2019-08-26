export type MineResponse = Mine | null;
export type MineTypesResponse = MineTypeList;

export interface Mine {
    width: number;
    height: number;
    // cells
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
