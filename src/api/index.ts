import axios from "axios";
import {createDiscreteApi} from "naive-ui";

export const axiosWithNoLoadingBar = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

const {message, loadingBar} = createDiscreteApi(
    ['message']
)

axiosWithNoLoadingBar.interceptors.response.use((response) => {
    const res = response.data;
    if (res.code !== 0) {
        message.error(res.message)
        return Promise.reject(res);
    }
    return res;
})