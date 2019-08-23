/**
 * For /dex API.
 */

export interface Request {
}

export interface Response {
    discoveredUnits: Record<number, MyUnitEnum>;
    lastUnitIsDiscovered: boolean;
}

interface MyUnitEnum {
    id: number;
    friendlyName: string;
    description: string;
    iconURL: string;
    fullURL: string;
}
