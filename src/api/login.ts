import axios from "axios";

export interface RegisterData {
    email: string
    password: string
    captcha: string
}

export const register = (data: RegisterData) => {
    return axios.post('/register', data)
}

export interface SendGrData {
    token: string
    email: string
}

export const sendGr = (data: SendGrData) => {
    return axios.post('/captcha', data)
}

export interface LoginData {
    email: string,
    password: string
}

export const login = (data: LoginData) => {
    return axios.post('/login', data)
}