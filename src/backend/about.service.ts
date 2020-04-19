import * as RxJS from "rxjs";
import { API_ROOT } from "../helper/const";
import authHeader from "../helper/auth-header";
import handleResponse from "../helper/handle-response";
import * as AboutEndpoint from "./about";

const aboutService = {
    getBackendVersion: () => RxJS.from(
        fetch(`${API_ROOT}/api/version`, {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<AboutEndpoint.BackendVersionResponse>(res)
        )
    )
};

export default aboutService;
