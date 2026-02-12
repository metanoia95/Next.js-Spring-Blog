import { ssrApi } from "@/lib/ssrApi";

export interface getBlogPostRes {
    id: string;
    authorId: string;
    title: string;
    page_html: string;
    created_at: string;
}


// 글 목록 조회
export async function getPostList({
    keyword,
    currentPage = 1,
    pageSize = 10,
}:{
    keyword?: string;   // 검색어
    currentPage?: number; //현재 페이지
    pageSize?: number;  // 페이지당 글 개수
}) {
    const params = new URLSearchParams();
    //console.log("currentPage", currentPage)
    
    if(keyword){
        params.append('keyword', keyword);
        
    }else{
        params.append('keyword', "");
    }
    
    params.append('page', (currentPage-1).toString());
    params.append('size', pageSize.toString());
    params.append('sort', 'createdAt,desc')
    

    const queryString  = params.toString(); //페이지네이션 위해 쿼리스트링 처리
    
    const url = queryString ? `/api/blog/posts?${queryString }` : `/api/blog/posts`;

    const res = await ssrApi(url);
    if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }
    
    const result = await res.json();
    console.log("result", result)  
    return result;
}


// 본문 조회
export async function getBlogPost(id: string): Promise<getBlogPostRes> {
    const res = await ssrApi(`/api/blog/posts/${id}`)
    
    const data: getBlogPostRes = await res.json();
    return data
}

export async function getPostComments(postId: string) {
    return await ssrApi(`/api/blog/comments/${postId}`)
}