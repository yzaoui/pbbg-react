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
    fetchingNextStage: Set<number>;
};

class FarmPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    private initialFetchRequest: Subscription | null = null;
    private refreshRequest: Subscription | null = null;

    componentDidMount() {
        document.title = "Farm - PBBG";

        this.initialFetchRequest = farmService.getPlots()
            .subscribe(res => this.setState({ status: "loaded", plots: res.data.map(json => plotFromJSON(json)), fetchingNextStage: new Set() }));
    }

    componentWillUnmount() {
        this.initialFetchRequest !== null && this.initialFetchRequest.unsubscribe();
        this.refreshRequest !== null && this.refreshRequest.unsubscribe();
    }

    render() {
        if (this.state.status === "loading") return <LoadingSpinner />;

        return <div className="FarmPage">
            <PlotList plots={this.state.plots} refreshPlantProgress={this.refreshPlantProgress} fetchingNextStage={this.state.fetchingNextStage} />
        </div>;
    }

    private refreshPlantProgress = () => {
        if (this.state.status === "loading") return;

        const updatedPlots: PlotData[] = cloneDeep(this.state.plots);
        const now = new Date();
        const toFetch: Set<number> = new Set();

        for (const plot of updatedPlots) {
            if ("progress" in plot) {
                plot.progress = getPlantProgress(plot.plant, now);

                if (plot.progress.percentage === 1 && plot.plant.lifecycle.hasNextStage) {
                    toFetch.add(plot.id);

                    if (this.refreshRequest === null) this.fetchPlots();
                }
            }
        }

        this.setState({ status: "loaded", plots: updatedPlots, fetchingNextStage: toFetch });
    };

    private fetchPlots = () => {
        this.refreshRequest = farmService.getPlots()
            .subscribe(res => {
                this.refreshRequest = null;
                this.updatePlots(res.data)
            });
    };

    private updatePlots = (updatedPlotsJSON: PlotDataJSON[]) => {
        this.setState({ status: "loaded", plots: updatedPlotsJSON.map(plotJSON => plotFromJSON(plotJSON)) });
        this.refreshPlantProgress();
    };
}

export default FarmPage;
