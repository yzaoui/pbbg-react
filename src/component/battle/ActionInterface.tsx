import React from "react";
import LoadingButton from "../LoadingButton";

type Props = {
    performingAction: boolean;
} & ({
    enemyTurn: true;
    onProcessEnemyTurn: () => void;
} | {
    enemyTurn: false;
    onProcessAllyTurn: () => void;
});

const ActionInterface: React.FC<Props> = (props) => <div>
    {props.enemyTurn ?
        <LoadingButton loading={props.performingAction} onClick={props.onProcessEnemyTurn}>Process enemy turn</LoadingButton>
    :
        <LoadingButton loading={props.performingAction} onClick={props.onProcessAllyTurn}>Attack</LoadingButton>
    }
</div>;

export default ActionInterface;
