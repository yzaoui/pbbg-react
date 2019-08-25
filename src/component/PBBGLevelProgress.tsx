import React from "react";
import "./PBBGLevelProgress.css";

interface Props {
    className?: string;
    level: number;
    value: number
    max: number;
}

const PBBGLevelProgress: React.FC<Props> = ({ className, level, value, max }) => <div className={`pbbg-level-progress${className ? ` ${className}` : ""}`}>
    <div className="outer">
        <div className="inner" style={{ width: `${(value / max) * 100}%` }} />
    </div>
</div>;

export default PBBGLevelProgress;
