import axios from "axios";

export interface Topic {
    id: number,
    created_at: string,
    content: string,
    campus: string,
    verified?: boolean,
}

export type TopicList = Topic[];

export const getTopic = (limit: number, offset: number) => {
    return axios.get<TopicList>('/topic/' + limit + '/' + offset);
}

export interface PostTopic {
    content: string;
}

export const postTopic = (data: PostTopic) => {
    return axios.post('/topic', data);
}