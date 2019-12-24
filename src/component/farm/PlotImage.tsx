import React from "react";
import ground from "../../img/ground.png";
import appleGrowing0 from "../../img/apple_growing_0.gif";
import appleGrowing1 from "../../img/apple_growing_1.png";
import appleGrowing2 from "../../img/apple_growing_2.png";
import appleGrowing3 from "../../img/apple_growing_3.png";
import appleMature0 from "../../img/apple_mature_0.png";
import { PlantJSON } from "../../backend/farm";
import { PlantProgress } from "../../model/farm";

type Props = {
    plant: PlantJSON;
    progress: PlantProgress;
    fetchingNextStage: boolean;
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

const plantToImage = (plant: PlantJSON, progress: PlantProgress) => {
    if (plant === null) return <></>;

    if (plant.type === "apple") {
        const { hasNextStage } = plant.lifecycle;

        // Get index into images based on plant progress
        let index: number;
        let stage: "growing" | "mature";

        if (hasNextStage) {
            // If there is a next stage, all sprites are distributed evenly
            stage = "growing";
            if (progress.percentage === 1) {
                // When at 100% but there is a next stage, show the last sprite until the next stage is loaded in
                index = appleStages[stage].length - 1;
            } else {
                index = Math.floor(appleStages[stage].length * progress.percentage);
            }
        } else {
            // If there is no next stage, the last sprite should only appear at 100% progress
            stage = "mature";
            index = Math.floor((appleStages[stage].length - 1) * progress.percentage);
        }

        return <img src={appleStages[stage][index].src} alt={`Apple tree at stage ${stage} ${index}`} />;
    }
};

const appleStages = {
    "growing": [
        { src: appleGrowing0 },
        { src: appleGrowing1 },
        { src: appleGrowing2 },
        { src: appleGrowing3 }
    ],
    "mature": [
        { src: appleMature0 }
    ]
};

export default PlotImage;
