import React from "react";
import { MyUnit } from "../backend/squad";

interface Props {
    unit: MyUnit;
}

const PBBGUnit: React.FC<Props> = ({ unit }) => <div>
    <img src={unit.idleAnimationURL} />
</div>;

export default PBBGUnit;
