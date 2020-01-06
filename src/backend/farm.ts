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
    isMature: boolean | null;
};

export type BasePlantJSON = {
    growingPeriod: number;
    growingSprite: string;
} & (
    {
        maturePeriod: null;
        matureSprite: null;
    } | {
        maturePeriod: number;
        matureSprite: string;
    }
);
