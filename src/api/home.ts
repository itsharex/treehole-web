import axios from "axios";

export const getTopic = (limit: number, offset: number) => {
    return axios.get('/topic/' + limit + '/' + offset);
}