import * as RxJS from "rxjs";
import { API_ROOT } from "../helper/const";
import authHeader from "../helper/auth-header";
import handleResponse from "../helper/handle-response";
import * as MarketEndpoint from "./market";

const marketService = {
    getMarket: () => RxJS.from(
        fetch(`${API_ROOT}/api/market`, {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<MarketEndpoint.MarketResponse>(res)
        )
    ),
    getUserInventory: () => RxJS.from(
        fetch(`${API_ROOT}/api/market/inventory`, {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<MarketEndpoint.UserInventoryResponse>(res)
        )
    )
};

export default marketService;
