import axios from "axios";
import {recaptchaCfg} from "./index";
import {gr} from "../utils/recaptcha";

export interface Topic {
    id: number,
    created_at: string,
    content: string,
    campus: string,
    verified?: boolean,
    starred: boolean,
    star_count?: number,
}

export type TopicList = Topic[];

export const getTopic = (limit: number, offset: number) => {
    return axios.get<TopicList>('/topics/' + limit + '/' + offset);
}

export interface PostTopic {
    content: string;
}

export const postTopic = async (data: PostTopic) => {
    return axios.post('/topic', data, recaptchaCfg(await gr()));
}

export const PutStar = (id: number) => {
    return axios.put('/topic/star/' + id);
}

export const GetStarList = (limit: number, offset: number) => {
    return axios.get<TopicList>('/topic/star/' + limit + '/' + offset);
}

export const GetOneTopic = (id: number) => {
    return axios.get<Topic>('/topic/' + id);
}