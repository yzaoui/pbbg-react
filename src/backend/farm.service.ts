import * as RxJS from "rxjs";
import * as FarmEndpoint from "./farm";
import { PlantJSON, PlotDataJSON } from "./farm";
import { Success } from "../JSend";

const farmService = {
    getPlots: (ids?: number[]): RxJS.Observable<Success<FarmEndpoint.AllPlotsResponse>> => RxJS.from(
        initialPlotsRequest(ids)
    )
};

const initialNow = new Date();
const start = new Date(initialNow.getTime());
const end = new Date(initialNow.getTime() + 5 * 1000);

const apple = (now: Date): PlantJSON => ({
    type: "apple",
    lifecycle: {
        hasNextStage: now < end,
        startTimestamp: (now < end ? start : end).toISOString(),
        endTimestamp: end.toISOString(),
    }
});

const mockPlots = (now: Date, ids?: number[]): PlotDataJSON[] => {
    const plots = [
        {
            id: 0,
            plant: apple(now),
        },
        {
            id: 1,
            plant: null,
        },
    ];

    return ids === undefined ? plots : plots.filter(plot => ids.some(id => plot.id === id));
};

const initialPlotsRequest = (ids?: number[]): Promise<Success<FarmEndpoint.AllPlotsResponse>> => new Promise(resolve => setTimeout(() => resolve({
    status: "success",
    data: mockPlots(new Date(), ids)
}), 1000));

export default farmService;
