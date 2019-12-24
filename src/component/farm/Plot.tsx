import React from "react";
import PlotImage from "./PlotImage";
import PlotFooter from "./PlotFooter";
import LoadingSpinner from "../LoadingSpinner";
import { EmptyPlotData, OccupiedPlotData } from "../../model/farm";

type Props = {
    plot: EmptyPlotData;
    onPlant: (plotId: number) => void;
    loading: boolean;
} | {
    plot: OccupiedPlotData;
    fetchingNextStage: boolean;
};

const Plot: React.FC<Props> = (props: Props) => <div className="Plot">
    {"fetchingNextStage" in props ? <>
        {props.fetchingNextStage &&
            overlay
        }
        <PlotImage plant={props.plot.plant} progress={props.plot.progress} />
        <PlotFooter progress={props.plot.progress} hasNextStage={props.plot.plant!.lifecycle.hasNextStage} />
    </> : <>
        {props.loading &&
            overlay
        }
        <PlotImage />
        <PlotFooter onPlant={() => props.onPlant(props.plot.id)} />
    </>}
</div>;

const overlay = <div className="overlay">
    <div className="spinner-holder">
        <LoadingSpinner />
    </div>
</div>;

export default Plot;
