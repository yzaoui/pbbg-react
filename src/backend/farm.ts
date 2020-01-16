/**
 * /farm/plots
 */
export type PlotsResponse = PlotJSON[];

/**
 * /farm/plant
 */
export type PlantRequest = {
    plotId: number;
    itemId: number;
};
export type PlantResponse = PlotJSON;

/**
 * /farm/harvest
 */
export type HarvestRequest = {
    plotId: number;
};
export type HarvestResponse = PlotJSON;

/**
 * /farm/expand
 */
export type ExpandResponse = PlotJSON;

export type PlotJSON = EmptyPlotJSON | OccupiedPlotJSON;

export type EmptyPlotJSON = {
    id: number;
    plant: null;
};

export type OccupiedPlotJSON = {
    id: number;
    plant: MaterializedPlantJSON;
};

export type MaterializedPlantJSON = {
    basePlant: BasePlantJSON;
    cycleStart: string;
    isMature: null;
} | {
    basePlant: MaturableBasePlantJSON;
    cycleStart: string;
    isMature: boolean;
};

export interface BasePlantJSON {
    id: number;
    name: string;
    icon: string;
    description: string;
    growingPeriod: number;
    growingSprite: string;
    maturePeriod: number | null;
    matureSprite: string | null;
}

export interface MaturableBasePlantJSON extends BasePlantJSON {
    maturePeriod: number;
    matureSprite: string;
}

export const isMaturableBasePlantJSON = (basePlant: BasePlantJSON): basePlant is MaturableBasePlantJSON =>
    basePlant.maturePeriod !== null && basePlant.matureSprite !== null;
