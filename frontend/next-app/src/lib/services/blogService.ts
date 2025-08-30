import api from "@/lib/axios";
import { AxiosResponse } from "axios";
import { ssrApi } from "../ssrApi";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";


export interface SaveCommentReq {
    post_id: number
    text: string;
}

export interface SaveBlogPostReq {

    id?: number; // undefined. id가 없으면 -> create / id가 있으면 -> update로
    title: string;
    page_json: string;
    page_html?: string | null;

}

// const res = await fetch(`http://localhost:8089/api/blog/posts/${params.id}`, {
//     cache: "no-store", // SSR 목적일 경우
//   }); // 별도의 필드 주입이 없으면 get 사용
//   //console.log("posts : ",await res.json())
//   console.log();
//   const post = await res.json();
//   //const posts = await res.json();


export interface getPostJsonRes {

    id: number;
    title: string;
    page_json: string;

}

export interface getBlogPostRes {
    id: number;
    authorId: number;
    title: string;
    page_html: string;
    created_at: string;
}


export async function saveBlogPost(
    data: SaveBlogPostReq

): Promise<AxiosResponse> {

    return await api.post('/api/blog/saveblogpost', data);

}

export async function updateBlogPost(
    data: SaveBlogPostReq

): Promise<AxiosResponse> {

    return await api.put('/api/blog/posts', data);

}

export async function deletePost(
    id: number
): Promise<AxiosResponse> {

    return await api.delete(`/api/blog/posts/${id}`)
}

export async function getPostJson(
    id: number
): Promise<getPostJsonRes> {

    const res = await api.get(`/api/blog/posts/getjson/${id}`);

    return res.data;

}

export async function SaveComment(
    data: SaveCommentReq
): Promise<AxiosResponse> {
    return await api.post(`/api/blog/comment`, data)
}


export async function deleteComment(
    id: number
): Promise<AxiosResponse> {

    return await api.delete(`/api/blog/comment/${id}`)
}


export async function getPostList() {

    return await ssrApi(`/api/blog/posts`)
}

export async function getBlogPost(id: number): Promise<getBlogPostRes> {
    const res = await ssrApi(`/api/blog/posts/${id}`)
    const data: getBlogPostRes = await res.json();
    return data
}

export async function getPostComments(postId: number) {
    return await ssrApi(`/api/blog/comments/${postId}`)
}

export async function getPostCommentsAxios(postId: number): Promise<AxiosResponse> {
    return await api.get(`/api/blog/comments/${postId}`)
}