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
type UnitIndividualResponse = MyUnitEnum

/**
 * /dex/items
 */
export interface ItemsResponse {
    discoveredItems: {[id: number]: ItemEnum};
    lastItemIsDiscovered: boolean;
}

interface MyUnitEnum {
    id: number;
    friendlyName: string;
    description: string;
    iconURL: string;
    fullURL: string;
}

interface ItemEnum {
    friendlyName: string;
    imgURL: string;
    description: string;
}
