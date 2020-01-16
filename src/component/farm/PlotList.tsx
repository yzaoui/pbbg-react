import React from "react";
import Plot from "./Plot";
import { isOccupiedPlotData, PlotData } from "../../model/farm";

type Props = {
    plots: PlotData[];
    refreshPlantProgress: () => void;
    fetchingNextStage: Set<number>;
    loadingPlots: Set<number>;
    onPlant: (plotId: number) => void;
    onHarvest: (plotId: number) => void;
};

class PlotList extends React.Component<Props> {
    private forceUpdateInterval: (number | null) = null;

    componentDidMount() {
        this.forceUpdateInterval = window.setInterval(this.props.refreshPlantProgress, 100);
    }

    componentWillUnmount() {
        if (this.forceUpdateInterval !== null) {
            clearInterval(this.forceUpdateInterval);
            this.forceUpdateInterval = null;
        }
    }

    render() {
        const { plots, fetchingNextStage, loadingPlots, onPlant, onHarvest } = this.props;

        return <ul className="PlotList">
            {plots.map(plot =>
                <li key={plot.id}>
                    {isOccupiedPlotData(plot) ?
                        <Plot plot={plot} loading={loadingPlots.has(plot.id)} fetchingNextStage={fetchingNextStage.has(plot.id)} onHarvest={onHarvest} />
                    :
                        <Plot plot={plot} onPlant={onPlant} loading={loadingPlots.has(plot.id)} />
                    }
                </li>
            )}
        </ul>;
    }
}

export default PlotList;
