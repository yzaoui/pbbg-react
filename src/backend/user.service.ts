import authHeader from "../helper/auth-header";
import handleResponse from "../helper/handle-response";
import * as UserEndpoint from "../backend/user";
import * as RxJS from "rxjs";

const userService = {
    get: () => RxJS.from(
        fetch("/api/user", {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<UserEndpoint.Response>(res)
        )
    )
};

export default userService;
