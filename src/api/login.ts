import axios from "axios";

export interface RegisterData {
    NickName: string
    Email: string
    Password: string
    Captcha: string
}

export const register = (data: RegisterData) => {
    return axios.postForm('/register', data)
}

