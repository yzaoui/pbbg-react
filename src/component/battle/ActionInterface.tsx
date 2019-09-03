import React from "react";

type Props = {
    enemyTurn: true;
    onProcessEnemyTurn: () => void;
} | {
    enemyTurn: false;
}

const ActionInterface: React.FC<Props> = (props) => <div>
    {props.enemyTurn ?
        <button className="fancy" onClick={props.onProcessEnemyTurn}>Process enemy turn</button>
    :
        <button className="fancy">Attack</button>
    }
</div>;

export default ActionInterface;
