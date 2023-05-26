import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from "axios";
import {getToken} from "./utils/auth";
import {createDiscreteApi} from "naive-ui";

axios.defaults.baseURL = 'http://localhost:5173/v1'

const {message, loadingBar} = createDiscreteApi(
    ['message', 'loadingBar']
)

axios.interceptors.request.use((config) => {
    loadingBar.start()
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    message.error("Request Error")
    loadingBar.error()
    return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
    loadingBar.finish()
    return response.data;
}, (error) => {
    message.error("Server Error")
    loadingBar.error()
    return Promise.reject(error);
});

createApp(App).use(router).mount('#app')
