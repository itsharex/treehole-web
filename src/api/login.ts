import axios from "axios";
import sha256 from "crypto-js/sha256";

export interface RegisterData {
    email: string
    password: string
    captcha: string
}

export const register = (data: RegisterData) => {
    data.password = sha256(data.password).toString()
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