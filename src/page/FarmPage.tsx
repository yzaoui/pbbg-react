import React from "react";
import "./FarmPage.scss";
import { PlotDataJSON } from "../backend/farm";
import cloneDeep from "lodash/cloneDeep";
import farmService from "../backend/farm.service";
import { Subscription } from "rxjs";
import { getPlantProgress, PlotData, plotFromJSON } from "../model/farm";
import LoadingSpinner from "../component/LoadingSpinner";
import ExpandablePlotList from "../component/farm/ExpandablePlotList";

type State = {
    status: "loading";
} | {
    status: "loaded";
    plots: PlotData[];
    fetchingNextStage: Set<number>;
    loadingPlots: Set<number>;
    expanding: boolean;
};

class FarmPage extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        status: "loading"
    };

    private initialFetchRequest: Subscription | null = null;
    private refreshRequest: Subscription | null = null;
    private plantRequests: Map<number, Subscription> = new Map();
    private harvestRequests: Map<number, Subscription> = new Map();
    private expandingRequest: Subscription | null = null;

    componentDidMount() {
        document.title = "Farm - PBBG";

        this.initialFetchRequest = farmService.getPlots()
            .subscribe(res => this.setState({ status: "loaded", plots: res.data.map(json => plotFromJSON(json)), fetchingNextStage: new Set(), loadingPlots: new Set(), expanding: false }));
    }

    componentWillUnmount() {
        this.initialFetchRequest !== null && this.initialFetchRequest.unsubscribe();
        this.refreshRequest !== null && this.refreshRequest.unsubscribe();
        this.plantRequests.forEach(req => req.unsubscribe());
        this.harvestRequests.forEach(req => req.unsubscribe());
        this.expandingRequest !== null && this.expandingRequest.unsubscribe();
    }

    render() {
        if (this.state.status === "loading") return <LoadingSpinner />;

        return <div className="FarmPage">
            <ExpandablePlotList
                plots={this.state.plots}
                refreshPlantProgress={this.refreshPlantProgress}
                fetchingNextStage={this.state.fetchingNextStage}
                loadingPlots={this.state.loadingPlots}
                expanding={this.state.expanding}
                onPlant={this.handlePlant}
                onHarvest={this.handleHarvest}
                onExpand={this.handleExpand}
            />
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

        this.setState({ ...this.state, plots: updatedPlots, fetchingNextStage: toFetch });
    };

    private fetchPlots = () => {
        this.refreshRequest = farmService.getPlots()
            .subscribe(res => {
                this.refreshRequest = null;
                this.setPlots(res.data);
            });
    };

    private setPlots = (updatedPlotsJSON: PlotDataJSON[]) => {
        if (this.state.status === "loading") return;

        this.setState({ ...this.state, plots: updatedPlotsJSON.map(plotJSON => plotFromJSON(plotJSON)) });
        this.refreshPlantProgress();
    };

    private updatePlot = (updatedPlot: PlotDataJSON) => {
        if (this.state.status === "loading") return;

        const updatedPlots = this.state.plots.filter(plot => plot.id !== updatedPlot.id) // Remove plot to update
            .concat(plotFromJSON(updatedPlot))
            .sort((a, b) => a.id - b.id);

        const updatedLoadingPlots = (new Set(this.state.loadingPlots));
        updatedLoadingPlots.delete(updatedPlot.id);

        this.setState({ ...this.state, plots: updatedPlots, loadingPlots: updatedLoadingPlots });
        this.refreshPlantProgress();
    };

    private handlePlant = (plotId: number) => {
        if (this.state.status === "loading") return;

        const existingRequest = this.plantRequests.get(plotId);
        if (existingRequest) {
            existingRequest.unsubscribe();
            this.plantRequests.delete(plotId);
        }

        this.setState({ ...this.state, loadingPlots: (new Set(this.state.loadingPlots)).add(plotId) });

        const newRequest = farmService.plant({ plotId: plotId })
            .subscribe(res => {
                this.plantRequests.delete(plotId);
                this.updatePlot(res.data);
            });

        this.plantRequests.set(plotId, newRequest);
    };

    private handleHarvest = (plotId: number) => {
        if (this.state.status === "loading") return;

        const existingRequest = this.harvestRequests.get(plotId);
        if (existingRequest) {
            existingRequest.unsubscribe();
            this.harvestRequests.delete(plotId);
        }

        this.setState({ ...this.state, loadingPlots: (new Set(this.state.loadingPlots)).add(plotId) });

        const newRequest = farmService.harvest({ plotId: plotId })
            .subscribe(res => {
                this.harvestRequests.delete(plotId);
                this.updatePlot(res.data);
            });

        this.harvestRequests.set(plotId, newRequest);
    };

    private handleExpand = () => {
        if (this.state.status === "loading") return;

        if (this.expandingRequest !== null) this.expandingRequest.unsubscribe();

        this.setState({ ...this.state, expanding: true });

        this.expandingRequest = farmService.expand()
            .subscribe(res => {
                this.expandingRequest = null;
                this.setState({ ...this.state, expanding: false });
                this.updatePlot(res.data);
            })
    };
}

export default FarmPage;
