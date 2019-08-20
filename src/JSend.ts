export interface Success {
    status: "success";
    data: any;
}

export interface Fail {
    status: "fail";
    data: any;
}

export interface Error {
    status: "error";
    message: string;
    code?: number;
    data?: any;
}

export type Response = Success | Fail | Error;

export const isSuccess = (res: Response): res is Success => res.status === "success";
export const isFail = (res: Response): res is Fail => res.status === "fail";
export const isError = (res: Response): res is Error => res.status === "error";
