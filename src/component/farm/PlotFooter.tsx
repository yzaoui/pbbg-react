import React from "react";
import PlotProgress from "./PlotProgress";
import { PlantProgress } from "../../model/farm";

type Props = {
    progress: PlantProgress;
    fetchingNextStage: boolean;
} | {};

const PlotFooter: React.FC<Props> = (props) => {
    if (!("progress" in props)) return <div className="PlotFooter">
        <button>Plant</button>
    </div>;

    return <div className="PlotFooter">
        <PlotProgress progress={props.progress} />
        <button disabled={props.progress.percentage < 1 || props.fetchingNextStage}>Harvest</button>
    </div>;
};

export default PlotFooter;
