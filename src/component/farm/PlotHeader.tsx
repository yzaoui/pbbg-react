import React from "react";
import PlotProgress from "./PlotProgress";
import { MaterializedPlant, OccupiedPlotData, PlantProgress } from "../../model/farm";
import PlotProgressButton from "./PlotProgressButton";

type Props = {
    loading: boolean;
    plot: OccupiedPlotData;
} | {};

const PlotHeader: React.FC<Props> = (props) => <div className="PlotHeader">
    {"plot" in props ? <>
        <span>{props.plot.plant.basePlant.name}</span>
    </> : <>
        <span/>
    </>}
</div>

export default PlotHeader;
