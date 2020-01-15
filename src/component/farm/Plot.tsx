import React from "react";
import PlotImage from "./PlotImage";
import PlotFooter from "./PlotFooter";
import LoadingSpinner from "../LoadingSpinner";
import { isMaturableMaterializedPlant, OccupiedPlotData, PlotData } from "../../model/farm";

type Props = {
    loading: boolean;
} & (
    {
        plot: PlotData;
        onPlant: (plotId: number) => void;
    } | {
        plot: OccupiedPlotData;
        fetchingNextStage: boolean;
        onHarvest: (plotId: number) => void;
    }
);

const Plot: React.FC<Props> = (props: Props) => <div className="Plot">
    {"fetchingNextStage" in props ? <>
        {(props.fetchingNextStage || props.loading) &&
            overlay
        }
        <PlotImage plant={props.plot.plant} progress={props.plot.progress} />
        <PlotFooter
            loading={props.loading}
            progress={props.plot.progress}
            isHarvestable={!(isMaturableMaterializedPlant(props.plot.plant) && !props.plot.plant.isMature) && props.plot.progress.percentage === 1}
            onHarvest={() => props.onHarvest(props.plot.id)}
        />
    </> : <>
        {props.loading &&
            overlay
        }
        <PlotImage />
        <PlotFooter loading={props.loading} onPlant={() => props.onPlant(props.plot.id)} />
    </>}
</div>;

const overlay = <div className="overlay">
    <div className="spinner-holder">
        <LoadingSpinner />
    </div>
</div>;

export default Plot;
