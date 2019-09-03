import { MyUnit } from "./squad";

/**
 * /battle/session
 */
type BattleResponse = Battle | null;

interface Battle {
    allies: MyUnit[];
    enemies: MyUnit[];
    turns: Turn[];
}

interface Turn {
    unitId: number;
}
