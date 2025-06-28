'use client'

import Editor from "@/components/editor/editor";
import { getPostJson, SaveBlogPostReq, updateBlogPost } from "@/lib/services/blogService";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function PostPage({ params }: { params:Promise<{ id: string }> }) {
    const {id} =  use(params); // params:Promise : params를 비동기 처리
    const idNumber = Number(id);
    const [title, setTitle] = useState("");
    const [editorState, setEditorState] = useState<string | null>(null);
    const [initialContent, setInitialContent] = useState<string>();

    const router = useRouter();
    


    // 정보 가져오기
     useEffect(()=>{
          //if(!id) return; -> id값을 프롭으로 받는 경우.
    
          async function fetchPost(id:number) {
            const post = await getPostJson(id);
            setInitialContent(post.page_json);    // 한 번만 세팅
            setEditorState(post.page_json);
            setTitle(post.title);
          }
    
          fetchPost(idNumber);
    
        },[idNumber])

    

    const handleSave = async () => {
        try {
          if(!editorState) return
          const dto: SaveBlogPostReq = {
            id : idNumber,
            title : title,
            page_json: editorState,
          };
            const res = await updateBlogPost(dto);    
          if (res.status === 200) {
            router.push(`/blog/${dto.id}`);
          }
        } catch (error: unknown) {
          console.error(error);
        }
      };

    return (
        <div className="flex flex-col justify-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="post-title border-b outline-none justify-center"
      />

      <Editor editorState={editorState} setEditorState={setEditorState} initialContent={initialContent}/>
      <div className="flex justify-end mt-2">
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          onClick={handleSave}
        >
          저장하기
        </button>
      </div>
    </div>
    );
}