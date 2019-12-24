import React from "react";
import PlotImage from "./PlotImage";
import PlotFooter from "./PlotFooter";
import LoadingSpinner from "../LoadingSpinner";
import { EmptyPlotData, OccupiedPlotData } from "../../model/farm";

type Props = {
    plot: EmptyPlotData;
} | {
    plot: OccupiedPlotData;
    fetchingNextStage: boolean;
};

const Plot: React.FC<Props> = (props: Props) => <div className="Plot">
    {"fetchingNextStage" in props ? <>
        {props.fetchingNextStage &&
            <div className="overlay">
                <div className="spinner-holder">
                    <LoadingSpinner />
                </div>
            </div>
        }
        <PlotImage plant={props.plot.plant} progress={props.plot.progress} fetchingNextStage={props.fetchingNextStage} />
        <PlotFooter progress={props.plot.progress} hasNextStage={props.plot.plant!.lifecycle.hasNextStage} />
    </> : <>
        <PlotImage />
        <PlotFooter />
    </>}
</div>;

export default Plot;
