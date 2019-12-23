import React from "react";
import PlotImage from "./PlotImage";
import PlotFooter from "./PlotFooter";
import LoadingSpinner from "../LoadingSpinner";
import { EmptyPlotData, OccupiedPlotData, PlantProgress } from "../../model/farm";

type Props = {
    plot: EmptyPlotData;
} | {
    plot: OccupiedPlotData;
    progress: PlantProgress;
    fetchingNextStage: boolean;
};

const Plot: React.FC<Props> = (props: Props) => <div className="Plot">
    {"progress" in props ? <>
        {props.fetchingNextStage &&
            <div className="overlay">
                <div className="spinner-holder">
                    <LoadingSpinner />
                </div>
            </div>
        }
        <PlotImage plant={props.plot.plant} progress={props.progress} fetchingNextStage={props.plot.fetchingNextStage} />
        <PlotFooter progress={props.progress} fetchingNextStage={props.plot.fetchingNextStage} />
    </> : <>
        <PlotImage />
        <PlotFooter />
    </>}
</div>;

export default Plot;
