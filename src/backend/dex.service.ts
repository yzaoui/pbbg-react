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
            res => handleResponse<DexEndpoint.UnitsResponse>(res)
        )
    ),
    getItems: () => RxJS.from(
        fetch("/api/dex/items", {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<DexEndpoint.ItemsResponse>(res)
        )
    )
};

export default dexService;
