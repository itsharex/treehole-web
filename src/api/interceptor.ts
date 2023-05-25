import axios from "axios";

export interface HttpResponse<T = unknown> {
    status: number;
    msg: string;
    code: number;
    data: T;
}

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    if (error.response.code === 401) {
        window.location.href = '/login';
        return
    }
    return Promise.reject(error);
});