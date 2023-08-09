import axios from "axios";
import {message} from "../utils/discreteApi";

export const axiosWithNoLoadingBar = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

axiosWithNoLoadingBar.interceptors.response.use((response) => {
    const res = response.data;
    if (res.code !== 0) {
        message.error(res.message)
        return Promise.reject(res);
    }
    return res;
})

export const recaptchaCfg = (token: string) => {
    return {
        headers: {
            "Recaptcha": token
        }
    }
}