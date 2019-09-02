import authHeader from "../helper/auth-header";
import handleResponse from "../helper/handle-response";
import * as UserEndpoint from "../backend/user";
import * as RxJS from "rxjs";
import { API_ROOT } from "../helper/const";

const userService = {
    get: () => RxJS.from(
        fetch(`${API_ROOT}/api/user`, {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<UserEndpoint.Response>(res)
        )
    )
};

export default userService;
