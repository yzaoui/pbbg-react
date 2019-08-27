import React from "react";
import PBBGLevelProgress from "./PBBGLevelProgress";
import "./LevelInfo.css";
import { LevelProgress } from "../backend/user";

interface Props {
    levelProgress: LevelProgress;
}

const LevelInfo: React.FC<Props> = ({ levelProgress: { level, relativeExp, relativeExpToNextLevel } }) => <div className="LevelInfo">
    <PBBGLevelProgress level={level} value={relativeExp} max={relativeExpToNextLevel} />
    <span>Lv. {level} — {relativeExp} / {relativeExpToNextLevel}</span>
</div>;

export default LevelInfo;
