import * as RxJS from "rxjs";
import { API_ROOT } from "../helper/const";
import authHeader from "../helper/auth-header";
import handleResponse from "../helper/handle-response";
import * as BattleEndpoint from "./battle";

const battleService = {
    getBattle: () => RxJS.from(
        fetch(`${API_ROOT}/api/battle/session`, {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<BattleEndpoint.BattleResponse>(res)
        )
    ),
    generateBattle: () => RxJS.from(
        fetch(`${API_ROOT}/api/battle/session?action=generate`, {
            method: "POST",
            headers: authHeader()
        }).then(
            res => handleResponse<BattleEndpoint.BattleGenerateResponse>(res)
        )
    ),
    enemyTurn: () => RxJS.from(
        fetch(`${API_ROOT}/api/battle/enemyTurn`, {
            method: "POST",
            headers: authHeader()
        }).then(
            res => handleResponse<BattleEndpoint.BattleActionResult>(res)
        )
    )
};

export default battleService;
