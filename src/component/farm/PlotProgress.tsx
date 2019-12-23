import React from "react";
import { PlantProgress } from "../../model/farm";

type Props = {
    progress: PlantProgress;
};

const PlotProgress: React.FC<Props> = ({ progress }) => <div className="PlotProgress">
    {progress.remainingTime}
</div>;

export default PlotProgress;
