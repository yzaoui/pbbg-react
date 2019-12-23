import { EmptyPlotDataJSON, OccupiedPlotDataJSON, PlantJSON, PlotDataJSON } from "../backend/farm";

export type PlotData = (EmptyPlotData | OccupiedPlotData);

export type EmptyPlotData = EmptyPlotDataJSON;

export type OccupiedPlotData = OccupiedPlotDataJSON & {
    progress: PlantProgress;
    fetchingNextStage: boolean;
};

export type PlantProgress = {
    percentage: number;
    remainingTime: string;
};

export const plotFromJSON = (plot: PlotDataJSON): PlotData => {
    if (plot.plant !== null) {
        return {
            ...plot,
            progress: getPlantProgress(plot.plant, new Date()),
            fetchingNextStage: false
        }
    } else {
        return plot;
    }
};

export const getPlantProgress = (plant: PlantJSON, nowDate: Date): PlantProgress => {
    const start = Date.parse(plant.lifecycle.startTimestamp);
    const end = Date.parse(plant.lifecycle.endTimestamp);
    const now = nowDate.getTime();

    if (now > end) {
        return {
            percentage: 1,
            remainingTime: millisecondsToHourMinuteSecond(0)
        };
    } else if (now < start) {
        return {
            percentage: 0,
            remainingTime: millisecondsToHourMinuteSecond(end - start)
        };
    } else {
        return {
            percentage: ((now - start) / (end - start)),
            remainingTime: millisecondsToHourMinuteSecond(end - now)
        };
    }
};

const millisecondsToHourMinuteSecond = (ms: number): string => {
    const hours = Math.floor(ms / 1000 / 60 / 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);

    return [hours, minutes, seconds]
        .map((num) => num < 10 ? `0${num}` : `${num}`)
        .join(":");
};
