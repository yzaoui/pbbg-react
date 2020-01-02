import * as RxJS from "rxjs";
import * as FarmEndpoint from "./farm";
import { PlotJSON } from "./farm";
import { Success } from "../JSend";

const farmService = {
    getPlots: (): RxJS.Observable<Success<FarmEndpoint.AllPlotsResponse>> => RxJS.from(
        getPlotsRequest()
    ),
    plant: (req: FarmEndpoint.PlantRequest): RxJS.Observable<Success<FarmEndpoint.PlantResponse>> => RxJS.from(
        plantRequest(req)
    ),
    harvest: (req: FarmEndpoint.HarvestRequest): RxJS.Observable<Success<FarmEndpoint.HarvestResponse>> => RxJS.from(
        harvestRequest(req.plotId)
    ),
    expand: (): RxJS.Observable<Success<FarmEndpoint.ExpandResponse>> => RxJS.from(
        expandRequest()
    )
};

let mockPlots: PlotJSON[] = [
    {
        id: 0,
        plant: null,
    }
];

const getPlotsRequest = (): Promise<Success<FarmEndpoint.AllPlotsResponse>> => new Promise(resolve => setTimeout(() => resolve({
    status: "success",
    data: mockPlots
}), 500));

const plantRequest = ({ plotId, itemId }: FarmEndpoint.PlantRequest): Promise<Success<FarmEndpoint.PlantResponse>> => {
    const now = (new Date()).getTime();

    return new Promise(resolve => setTimeout(() => {
        const lifespan = 10 * 1000;

        const updatedPlot: PlotJSON = {
            id: plotId,
            plant: {
                type: "apple",
                lifecycle: {
                    hasNextStage: true,
                    startTimestamp: (new Date(now)).toISOString(),
                    endTimestamp: (new Date(now + lifespan)).toISOString()
                }
            }
        };

        setTimeout(() => {
            updatedPlot.plant.lifecycle.hasNextStage = false;
        }, lifespan);

        mockPlots = mockPlots.filter(plot => plot.id !== plotId)
            .concat(updatedPlot)
            .sort((a, b) => a.id - b.id);

        resolve({
            status: "success",
            data: updatedPlot
        })
    }, 500));
};

const harvestRequest = (plotId: number): Promise<Success<FarmEndpoint.HarvestResponse>> => {
    const now = (new Date()).getTime();

    return new Promise(resolve => setTimeout(() => {
        const lifespan = 7 * 1000;

        const updatedPlot: PlotJSON = {
            id: plotId,
            plant: {
                type: "apple",
                lifecycle: {
                    hasNextStage: false,
                    startTimestamp: (new Date(now)).toISOString(),
                    endTimestamp: (new Date(now + lifespan)).toISOString()
                }
            }
        };

        mockPlots = mockPlots.filter(plot => plot.id !== plotId)
            .concat(updatedPlot)
            .sort((a, b) => a.id - b.id);

        resolve({
            status: "success",
            data: updatedPlot
        })
    }, 500));
};

const expandRequest = (): Promise<Success<FarmEndpoint.ExpandResponse>> => new Promise(
    resolve => setTimeout(() => {
        const newPlot: PlotJSON = {
            id: mockPlots.length,
            plant: null
        };

        mockPlots = mockPlots.concat(newPlot);

        resolve({
            status: "success",
            data: newPlot
        })
    }, 500)
);

export default farmService;
