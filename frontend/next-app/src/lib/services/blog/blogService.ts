import { jsonApi} from "@/lib/axios";
import { AxiosResponse } from "axios";



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



export async function saveBlogPost(
    data: SaveBlogPostReq

): Promise<AxiosResponse> {

    return await jsonApi.post('/api/blog/saveblogpost', data);

}

export async function updateBlogPost(
    data: SaveBlogPostReq

): Promise<AxiosResponse> {

    return await jsonApi.put('/api/blog/posts', data);

}

export async function deletePost(
    id: number
): Promise<AxiosResponse> {

    return await jsonApi.delete(`/api/blog/posts/${id}`)
}

export async function getPostJson(
    id: number
): Promise<getPostJsonRes> {

    const res = await jsonApi.get(`/api/blog/posts/getjson/${id}`);

    return res.data;

}

export async function SaveComment(
    data: SaveCommentReq
): Promise<AxiosResponse> {
    return await jsonApi.post(`/api/blog/comment`, data)
}


export async function deleteComment(
    id: number
): Promise<AxiosResponse> {

    return await jsonApi.delete(`/api/blog/comment/${id}`)
}



export async function getPostCommentsAxios(postId: number): Promise<AxiosResponse> {
    return await jsonApi.get(`/api/blog/comments/${postId}`)
}