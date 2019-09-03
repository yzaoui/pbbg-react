import React from "react";
import LoadingButton from "../LoadingButton";
import "./ActionInterface.css";

type Props = {
    performingAction: boolean;
} & ({
    enemyTurn: true;
    onProcessEnemyTurn: () => void;
} | {
    enemyTurn: false;
    onProcessAllyTurn: () => void;
});

const ActionInterface: React.FC<Props> = (props) => <div className="ActionInterface">
    <h1>Actions</h1>
    <div>
        {props.enemyTurn ?
            <LoadingButton loading={props.performingAction} onClick={props.onProcessEnemyTurn}>Process enemy turn</LoadingButton>
            :
            <LoadingButton loading={props.performingAction} onClick={props.onProcessAllyTurn}>Attack</LoadingButton>
        }
    </div>
</div>;

export default ActionInterface;
