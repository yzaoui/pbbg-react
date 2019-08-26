import authHeader from "../helper/auth-header";
import jsonHeader from "../helper/json-header";
import handleResponse from "../helper/handle-response";
import * as MineEndpoint from "./mine";
import * as RxJS from "rxjs";

const mineService = {
    getMine: () => RxJS.from(
        fetch("/api/mine", {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<MineEndpoint.MineResponse>(res)
        )
    ),
    getMineTypes: () => RxJS.from(
        fetch("/api/mine/types", {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<MineEndpoint.MineTypesResponse>(res)
        )
    ),
    enterMine: (req: MineEndpoint.MineEnterRequest) => RxJS.from(
        fetch("/api/mine/generate", {
            method: "POST",
            headers: { ...jsonHeader(), ...authHeader() },
            body: JSON.stringify(req)
        }).then(
            res => handleResponse<MineEndpoint.MineEnterResponse>(res)
        )
    )
};

export default mineService;
