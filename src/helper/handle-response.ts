import authenticationService from "../authentication.service";
import * as JSend from "./../JSend";

/**
 * Handles responses by either passing along the successful and JSON-parsed response,
 * or rejects the promise and optionally log out when 401 or 403.
 */
const handleResponse = (res: Response): Promise<JSend.Success> => res
    .text()
    .then(text => {
        if (!res.ok) {
            if (res.status === 401 || res.status === 403) {
                authenticationService.logout();
                window.location.reload();
            }

            return Promise.reject();
        }

        return JSON.parse(text);
    });

export default handleResponse;
