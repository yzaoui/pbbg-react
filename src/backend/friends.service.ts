import handleResponse from "../helper/handle-response";
import * as FriendsEndpoint from "./friends";
import * as RxJS from "rxjs";
import { API_ROOT } from "../helper/const";
import authHeader from "../helper/auth-header";

const friendsService = {
    getFriends: () => RxJS.from(
        fetch(`${API_ROOT}/api/friends`, {
            method: "GET",
            headers: authHeader()
        }).then(
            res => handleResponse<FriendsEndpoint.FriendsResponse>(res)
        )
    )
};

export default friendsService;
