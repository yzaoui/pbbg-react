import * as RxJS from "rxjs";
import * as FarmEndpoint from "./farm";
import { PlantJSON, PlotDataJSON } from "./farm";
import { Success } from "../JSend";

const farmService = {
    getPlots: (): RxJS.Observable<Success<FarmEndpoint.AllPlotsResponse>> => RxJS.from(
        initialPlotsRequest()
    )
};

const initialNow = new Date().getTime();

const fastApple = (now: Date): PlantJSON => {
    const start = new Date(initialNow);
    const end = new Date(initialNow + 5 * 1000);

    return {
        type: "apple",
        lifecycle: {
            hasNextStage: now < end,
            startTimestamp: (now < end ? start : end).toISOString(),
            endTimestamp: end.toISOString(),
        }
    };
};

const slowApple = (now: Date): PlantJSON => {
    const start = new Date(initialNow);
    const end = new Date(initialNow + 5.5 * 1000);

    return {
        type: "apple",
        lifecycle: {
            hasNextStage: now < end,
            startTimestamp: (now < end ? start : end).toISOString(),
            endTimestamp: end.toISOString(),
        }
    };
};

const mockPlots = (now: Date): PlotDataJSON[] => [
    {
        id: 0,
        plant: fastApple(now),
    },
    {
        id: 1,
        plant: null,
    },
    {
        id: 2,
        plant: slowApple(now),
    },
];

const initialPlotsRequest = (): Promise<Success<FarmEndpoint.AllPlotsResponse>> => new Promise(resolve => setTimeout(() => resolve({
    status: "success",
    data: mockPlots(new Date())
}), 2600));

export default farmService;
