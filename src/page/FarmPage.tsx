import React from "react";
import "./FarmPage.scss";
import PlotList from "../component/farm/PlotList";
import { PlotDataJSON } from "../backend/farm";
import cloneDeep from "lodash/cloneDeep";
import farmService from "../backend/farm.service";
import { Subscription } from "rxjs";
import { getPlantProgress, PlotData, plotFromJSON } from "../model/farm";
import LoadingSpinner from "../component/LoadingSpinner";

type State = {
    status: "loading";
} | {
    status: "loaded";
    plots: PlotData[];
};

class FarmPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    private initialFetch?: Subscription;
    private request?: Subscription;

    componentDidMount() {
        document.title = "Farm - PBBG";

        this.initialFetch = farmService.getPlots()
            .subscribe(res => this.setState({ status: "loaded", plots: res.data.map(json => plotFromJSON(json)) }));
    }

    render() {
        if (this.state.status === "loading") return <LoadingSpinner />;

        return <div className="FarmPage">
            <PlotList plots={this.state.plots} refreshPlantProgress={this.refreshPlantProgress} />
        </div>;
    }

    private refreshPlantProgress = () => {
        if (this.state.status === "loading") return;

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

        this.setState({ status: "loaded", plots: updatedPlots });
        this.fetchPlots(plotsToRefresh);
    };

    private fetchPlots = (ids: number[]) => {
        if (ids.length === 0) return;

        this.request = farmService.getPlots(ids)
            .subscribe(res => this.updatePlots(res.data));
    };

    private updatePlots = (updatedPlotsJSON: PlotDataJSON[]) => {
        if (this.state.status === "loading") return;

        const ids = updatedPlotsJSON.map(plot => plot.id);

        let updatedPlots: PlotData[] = updatedPlotsJSON.map(plotJSON => plotFromJSON(plotJSON));

        const newPlots = this.state.plots.filter(plot => !ids.some(id => plot.id === id) ) // Remove all plots to be updated
            .concat(updatedPlots) // Add newly updated plots
            .sort((a, b) => a.id - b.id);

        this.setState({ status: "loaded", plots: newPlots })
    };
}

export default FarmPage;
