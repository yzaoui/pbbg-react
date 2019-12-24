import * as RxJS from "rxjs";
import * as FarmEndpoint from "./farm";
import { PlotDataJSON } from "./farm";
import { Success } from "../JSend";

const farmService = {
    getPlots: (): RxJS.Observable<Success<FarmEndpoint.AllPlotsResponse>> => RxJS.from(
        initialPlotsRequest()
    ),
    plant: (req: FarmEndpoint.PlantRequest): RxJS.Observable<Success<FarmEndpoint.PlantResponse>> => RxJS.from(
        plantRequest(req.plotId)
    )
};

let mockPlots: PlotDataJSON[] = [
    {
        id: 0,
        plant: null,
    },
    {
        id: 1,
        plant: null,
    },
    {
        id: 2,
        plant: null,
    },
];

const initialPlotsRequest = (): Promise<Success<FarmEndpoint.AllPlotsResponse>> => new Promise(resolve => setTimeout(() => resolve({
    status: "success",
    data: mockPlots
}), 500));

const plantRequest = (plotId: number): Promise<Success<FarmEndpoint.PlantResponse>> => {
    const now = (new Date()).getTime();

    return new Promise(resolve => setTimeout(() => {
        const lifespan = 5 * 1000;

        const updatedPlot: PlotDataJSON = {
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

export default farmService;
