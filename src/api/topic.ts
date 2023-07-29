import axios from "axios";

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
    return axios.get<TopicList>('/topic/' + limit + '/' + offset);
}

export interface PostTopic {
    content: string;
}

export const postTopic = (data: PostTopic) => {
    return axios.post('/topic', data);
}

export const PutStar = (id: number) => {
    return axios.put('/topic/star/' + id);
}

export const GetStarList = (limit: number, offset: number) => {
    return axios.get<TopicList>('/topic/star/' + limit + '/' + offset);
}
