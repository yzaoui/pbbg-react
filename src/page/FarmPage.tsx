import React from "react";
import "./FarmPage.scss";
import { PlotDataJSON } from "../backend/farm";
import cloneDeep from "lodash/cloneDeep";
import farmService from "../backend/farm.service";
import { Subscription } from "rxjs";
import { getPlantProgress, PlotData, plotFromJSON } from "../model/farm";
import LoadingSpinner from "../component/LoadingSpinner";
import ExpandablePlotList from "../component/farm/ExpandablePlotList";
import PlantModal from "../component/farm/PlantModal";

type LoadingState = {
    status: "loading";
};

type LoadedState = {
    status: "loaded";
    plots: PlotData[];
    fetchingNextStage: Set<number>;
    loadingPlots: Set<number>;
    expanding: boolean;
    plantingPlotId: number | null;
};

type State = LoadingState | LoadedState;

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

        this.initialFetchRequest = farmService.getPlots().subscribe(res =>
            this.setState({
                status: "loaded",
                plots: res.data.map(json => plotFromJSON(json)),
                fetchingNextStage: new Set(),
                loadingPlots: new Set(),
                expanding: false,
                plantingPlotId: null
            }));
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
            <PlantModal open={this.state.plantingPlotId !== null} onClose={this.handlePlantModalClose} onSelect={this.handlePlantModalSelect} />
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

        this.setState({ plots: updatedPlots, fetchingNextStage: toFetch } as LoadedState);
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

        this.setState({ plots: updatedPlotsJSON.map(plotJSON => plotFromJSON(plotJSON)) } as LoadedState);
        this.refreshPlantProgress();
    };

    private updatePlot = (updatedPlot: PlotDataJSON) => {
        if (this.state.status === "loading") return;

        const updatedPlots = this.state.plots.filter(plot => plot.id !== updatedPlot.id) // Remove plot to update
            .concat(plotFromJSON(updatedPlot))
            .sort((a, b) => a.id - b.id);

        const updatedLoadingPlots = (new Set(this.state.loadingPlots));
        updatedLoadingPlots.delete(updatedPlot.id);

        this.setState({ plots: updatedPlots, loadingPlots: updatedLoadingPlots } as LoadedState);
        this.refreshPlantProgress();
    };

    private handlePlant = (plotId: number) => {
        if (this.state.status === "loading") return;

        this.setState({ plantingPlotId: plotId } as LoadedState);
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

    private handlePlantModalSelect = () => {
        if (this.state.status === "loading") return;

        const plotId = this.state.plantingPlotId!;

        const existingRequest = this.plantRequests.get(plotId);
        if (existingRequest) {
            existingRequest.unsubscribe();
            this.plantRequests.delete(plotId);
        }

        this.setState({ plantingPlotId: null, loadingPlots: (new Set(this.state.loadingPlots)).add(plotId) } as LoadedState);

        this.plantRequests.set(plotId,
            farmService.plant({ plotId: plotId })
                .subscribe(res => {
                    this.plantRequests.delete(plotId);
                    this.updatePlot(res.data);
                })
        );
    };

    private handlePlantModalClose = () => {
        this.setState({ plantingPlotId: null } as LoadedState);
    };
}

export default FarmPage;
