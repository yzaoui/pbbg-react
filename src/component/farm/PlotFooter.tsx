import React from "react";
import PlotProgress from "./PlotProgress";
import { PlantProgress } from "../../model/farm";
import PlotProgressButton from "./PlotProgressButton";

type Props = {
    progress: PlantProgress;
    hasNextStage: boolean;
    onHarvest: () => void;
} | {
    onPlant: () => void;
};

const PlotFooter: React.FC<Props> = (props) => {
    if (!("progress" in props)) return <div className="PlotFooter">
        <button className="fancy" onClick={props.onPlant}>Plant</button>
    </div>;

    const harvestable = props.progress.percentage === 1 && !props.hasNextStage;

    return <div className="PlotFooter">
        <PlotProgress progress={props.progress} ready={harvestable} />
        <PlotProgressButton disabled={!harvestable} percentage={props.progress.percentage} label="Harvest" onClick={props.onHarvest} />
    </div>;
};

export default PlotFooter;
