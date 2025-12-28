"use client";
import { getPostJson, saveBlogPost, SaveBlogPostReq, updateBlogPost } from "@/lib/services/blog/blogService";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Tiptap from "@/components/editors/tiptap/TiptabEditor";

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [editorJson, setEditorJSON] = useState<string | null>(null);
  const [editorHTML, setEditorHTML] = useState<string | null>(null);
  const [initContent, setInitContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();



  const searchParams = useSearchParams(); // 쿼리스트링 가져오기
  const id = Number(searchParams.get("id"));

  useEffect(() => {
    if(!id){  //새 글인 경우
      setIsLoading(false);
      return;
    }

    async function fetchPost(id: number) {
      try{
        
      const post = await getPostJson(id);
      setInitContent(JSON.parse(post.page_json));   
      setEditorJSON(post.page_json);
      setTitle(post.title);

      } finally{
        setIsLoading(false);
      }

    }

    fetchPost(id);
  }, [id])
  
  
  const handleSave = async () => {
    debugger;

    let res;
    try {
      if (!title) {
        alert("제목을 입력하십시오");
        return;
      }
      if (!editorJson) return
      const dto: SaveBlogPostReq = {
        id : id,
        title: title,
        page_json: editorJson,
        page_html: editorHTML,
      };

      if(id){
        res = await updateBlogPost(dto);
      }else{
        res = await saveBlogPost(dto);
      }
      if (res.status === 200) {
        if(id) router.push(`/blog/${dto.id}`);
        else router.push("/blog"); // 새 글이면 목록으로 이동
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center m-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="post-title border-b outline-none justify-center"
      />
      {/* 렉시컬 에디터  */}
      {/* <LexicalEditor editorState={editorState} setEditorState={setEditorState} /> */}

      {/* 팁탭 에디터 */}
      { !isLoading &&<Tiptap initContent={initContent} setEditorJSON={setEditorJSON} setEditorHTML={setEditorHTML} />}     
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
