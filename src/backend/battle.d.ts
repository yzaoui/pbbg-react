import { MyUnit } from "./squad";

/**
 * /battle/session
 */
type BattleResponse = Battle | null;

/**
 * /battle/session?action=generate
 */
type BattleGenerateResponse = Battle;

interface Battle {
    allies: MyUnit[];
    enemies: MyUnit[];
    turns: Turn[];
}

interface Turn {
    unitId: number;
}
