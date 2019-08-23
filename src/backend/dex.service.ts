import authHeader from "../helper/auth-header";
import handleResponse from "../helper/handle-response";
import * as DexEndpoint from "../backend/dex";
import * as RxJS from "rxjs";

const dexService = {
    getUnits: () => RxJS.from(
        fetch("/api/dex/units", {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<DexEndpoint.Response>(res)
        )
    )
};

export default dexService;
