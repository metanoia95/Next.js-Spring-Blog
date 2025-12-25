import { jsonApi} from "@/lib/axios";
import { AxiosResponse } from "axios";
import { ssrApi } from "../ssrApi";



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


export async function getPostList({
    keyword,
    page = 1,
    pageSize = 10
}:{
    keyword?: string;
    page?: number;
    pageSize?: number;  
}) {
    const params = new URLSearchParams();
    if(keyword){
        params.append('keyword', keyword);
        params.append('page', page.toString());
        params.append('pageSize', pageSize.toString());
    }
    const queryString  = params.toString();
    const url = queryString ? `/api/blog/posts/${queryString }` : `/api/blog/posts`;

    const res = await ssrApi(url);
    if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }
    
    const result = await res.json();
    console.log("result", result)  
    return result.content;
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
    return await jsonApi.get(`/api/blog/comments/${postId}`)
}