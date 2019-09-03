import * as RxJS from "rxjs";
import { API_ROOT } from "../helper/const";
import authHeader from "../helper/auth-header";
import handleResponse from "../helper/handle-response";
import * as BattleEndpoint from "./battle";

const battleService = {
    getBattle: () => RxJS.from(
        fetch(`${API_ROOT}/api/mine`, {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<BattleEndpoint.BattleResponse>(res)
        )
    )
};

export default battleService;
