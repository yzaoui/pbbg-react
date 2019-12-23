import React from "react";
import "./FarmPage.scss";
import PlotList from "../component/farm/PlotList";
import { PlantJSON, PlotDataJSON } from "../backend/farm";
import cloneDeep from "lodash/cloneDeep";
import farmService from "../backend/farm.service";
import { Subscription } from "rxjs";
import { getPlantProgress, PlotData, plotFromJSON } from "../model/farm";

const now = new Date();
const initialTimestamp = (new Date(now.getTime())).toISOString();
const matureTimestamp = (new Date(now.getTime() + 5 * 1000)).toISOString();

const appleInitial: PlantJSON = {
    type: "apple",
    lifecycle: {
        hasNextStage: true,
        startTimestamp: initialTimestamp,
        endTimestamp: matureTimestamp,
    }
};

const appleFinal: PlantJSON = {
    type: "apple",
    lifecycle: {
        hasNextStage: false,
        startTimestamp: matureTimestamp,
        endTimestamp: matureTimestamp,
    }
};

type State = {
    status: "loaded";
    plots: PlotData[];
}

class FarmPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        status: "loaded",
        plots: [
            {
                id: 0,
                plant: appleInitial,
                progress: getPlantProgress(appleInitial, new Date()),
                fetchingNextStage: false
            },
            {
                id: 1,
                plant: null,
            },
        ]
    };

    private request?: Subscription;

    componentDidMount() {
        document.title = "Farm - PBBG";
    }

    render() {
        return <div className="FarmPage">
            <PlotList plots={this.state.plots} refreshPlantProgress={this.refreshPlantProgress} />
        </div>;
    }

    private refreshPlantProgress = () => {
        const updatedPlots: PlotData[] = cloneDeep(this.state.plots);
        const plotsToRefresh: number[] = [];
        const now = new Date();

        for (const plot of updatedPlots) {
            if ("progress" in plot) {
                plot.progress = getPlantProgress(plot.plant, now);

                if (plot.progress.percentage === 1 && plot.plant.lifecycle.hasNextStage) {
                    plot.fetchingNextStage = true;
                    plotsToRefresh.push(plot.id);
                }
            }
        }

        this.setState({ plots: updatedPlots });
        this.fetchPlots(plotsToRefresh);
    };

    private fetchPlots = (ids: number[]) => {
        if (ids.length === 0) return;

        this.request = farmService.getPlot()
            .subscribe(
                res => this.updatePlots([{ id: 0, plant: appleFinal }])
            )
    };

    private updatePlots = (updatedPlotsJSON: PlotDataJSON[]) => {
        const ids = updatedPlotsJSON.map(plot => plot.id);

        let updatedPlots: PlotData[] = updatedPlotsJSON.map(plotJSON => plotFromJSON(plotJSON));

        const newPlots = this.state.plots.filter(plot => !ids.some(id => plot.id === id) ) // Remove all plots to be updated
            .concat(updatedPlots) // Add newly updated plots
            .sort((a, b) => a.id - b.id)

        this.setState({ plots: newPlots })
    };
}

export default FarmPage;
