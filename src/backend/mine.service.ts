import authHeader from "../helper/auth-header";
import handleResponse from "../helper/handle-response";
import * as MineEndpoint from "../backend/mine";
import * as RxJS from "rxjs";

const mineService = {
    getMineTypes: () => RxJS.from(
        fetch("/api/mine/types", {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<MineEndpoint.MineTypesResponse>(res)
        )
    )
};

export default mineService;
