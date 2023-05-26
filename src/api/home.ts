import axios from "axios";

export interface HttpResponse<T = unknown> {
    code: number;
    msg: string;
    data: T;
}

export const getTopic = (limit: number, offset: number) => {
    return axios.get('/topic/' + limit + '/' + offset);
}