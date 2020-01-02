/**
 * /farm/plots
 */
export type AllPlotsResponse = PlotJSON[];

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
    plant: PlantJSON;
};

export type PlantJSON = {
    type: "apple";
    lifecycle: {
        hasNextStage: boolean;
        startTimestamp: string;
        endTimestamp: string;
    };
};
