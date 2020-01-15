import React from "react";
import ground from "../../img/ground.png";
import { isMaturableMaterializedPlant, MaterializedPlant, PlantProgress } from "../../model/farm";

type Props = {
    plant: MaterializedPlant;
    progress: PlantProgress;
} | {};

const PlotImage: React.FC<Props> = (props: Props) => {
    if (!("plant" in props)) return <div className="PlotImage">
        <img src={ground} alt="Plot of dirt" />
    </div>;

    return <div className="PlotImage">
        <img src={ground} alt="Plot of dirt" />
        {plantToImage(props.plant, props.progress)}
    </div>;
};

const plantToImage = (plant: MaterializedPlant, progress: PlantProgress) => {
    let src: string;
    let index: number = 0;

    if (!isMaturableMaterializedPlant(plant)) {
        /* Non-maturable plant */
        src = plant.basePlant.growingSprite;
        index = Math.floor(3 * progress.percentage);
    } else {
        /* Maturable plant */
        if (plant.isMature) {
            src = plant.basePlant.matureSprite;
            index = Math.floor(3 * progress.percentage);
        } else {
            src = plant.basePlant.growingSprite;
            index = progress.percentage < 1 ? Math.floor(4 * progress.percentage) : 3;
        }
    }

    return <img className="plant" src={src} style={{ ["--sprite-index" as any]: index}} alt="Plant sprite" />;
};

export default PlotImage;
