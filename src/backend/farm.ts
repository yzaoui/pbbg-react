export type PlotDataJSON = EmptyPlotDataJSON | OccupiedPlotDataJSON;

export type EmptyPlotDataJSON = {
    id: number;
    plant: null;
};

export type OccupiedPlotDataJSON = {
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
