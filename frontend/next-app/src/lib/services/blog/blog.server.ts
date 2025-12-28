import { ssrApi } from "@/lib/ssrApi";

export interface getBlogPostRes {
    id: number;
    authorId: number;
    title: string;
    page_html: string;
    created_at: string;
}


export async function getPostList({
    keyword,
    currentPage = 1,
    pageSize = 10
}:{
    keyword?: string;   // 검색어
    currentPage?: number; //현재 페이지
    pageSize?: number;  // 페이지당 글 개수
}) {
    const params = new URLSearchParams();
    //console.log("currentPage", currentPage)
    if(keyword){
        params.append('keyword', keyword);
        
    }
    params.append('page', currentPage.toString());
    params.append('pageSize', pageSize.toString());

    const queryString  = params.toString(); //페이지네이션 위해 쿼리스트링 처리
    //console.log("queryString :", queryString)
    const url = queryString ? `/api/blog/posts?${queryString }` : `/api/blog/posts`;

    const res = await ssrApi(url);
    if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }
    
    const result = await res.json();
    //console.log("result", result)  
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