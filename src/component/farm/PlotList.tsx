import React from "react";
import Plot from "./Plot";
import { PlotData } from "../../model/farm";

type Props = {
    plots: PlotData[];
    refreshPlantProgress: () => void;
    fetchingNextStage: Set<number>;
    onPlant: (plotId: number) => void;
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
        const { plots, fetchingNextStage, onPlant } = this.props;

        return <ul className="PlotList">
            {plots.map(plot =>
                <li key={plot.id}>
                    {plot.plant !== null ?
                        <Plot plot={plot} fetchingNextStage={fetchingNextStage.has(plot.id)} />
                    :
                        <Plot plot={plot} onPlant={onPlant} />
                    }
                </li>
            )}
        </ul>;
    }
}

export default PlotList;
