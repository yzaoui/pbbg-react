import React, { HTMLAttributes } from "react";
import { MyUnit } from "../backend/squad";
import "./PBBGUnit.css"

interface Props extends HTMLAttributes<HTMLDivElement> {
    unit: MyUnit;
}

const PBBGUnit: React.FC<Props> = ({ unit, ...rest }) => <div className="pbbg-unit" {...rest}>
    <img src={unit.idleAnimationURL} className="sprite" />
    <div>
        <div>
            <span className="name">{unit.name}</span>
        </div>
        <div>
            <span>HP: </span>
            {/*pbbg-progress-bar*/}
            <span>{unit.hp} / {unit.maxHP}</span>
        </div>
        <div>
            <span className="stat-container">ATK: {unit.atk}</span>
            <span className="stat-container">DEF: {unit.def}</span>
        </div>
        <div>
            <span>Level {unit.levelProgress.level}</span>
            {/*pbbg-progress-bar*/}
            <span>{unit.levelProgress.relativeExp} / {unit.levelProgress.relativeExpToNextLevel}</span>
        </div>
    </div>
</div>;

export default PBBGUnit;
