import React from "react";
import "./PBBGLevelProgress.css";

interface Props {
    level: number;
    value: number
    max: number;
}

const PBBGLevelProgress: React.FC<Props> = ({ level, value, max }) => <div className="pbbg-level-progress">
    <div className="outer">
        <div className="inner" style={{ width: `${(value / max) * 100}%` }} />
    </div>
</div>;

export default PBBGLevelProgress;
