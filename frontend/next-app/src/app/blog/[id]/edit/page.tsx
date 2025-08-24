'use client'

import LexicalEditor from "@/components/editors/editor-lexical/LexicalEditor";
import Tiptap from "@/components/editors/tiptap/TiptabEditor";
import { getPostJson, SaveBlogPostReq, updateBlogPost } from "@/lib/services/blogService";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function PostPage({ params }: { params: { id: string } }) {
  const id = params.id; // params: params를 비동기 처리
  const idNumber = Number(id);
  const [title, setTitle] = useState("");
  const [editorJSON, setEditorJSON] = useState<string | null>(null);
  const [editorHTML, setEditorHTML] = useState<string | null>(null);
  const [initContent, setInitContent] = useState<string | null>(null);
  const router = useRouter();

  // 정보 가져오기
  useEffect(() => {
    async function fetchPost(id: number) {
      const post = await getPostJson(id);
      console.log(post.page_json)
      setInitContent(JSON.parse(post.page_json));   
      setEditorJSON(post.page_json);
      setTitle(post.title);
      
    }

    fetchPost(idNumber);

  }, [idNumber])


  const handleSave = async () => {
    console.log("글 수정 ")
    try {
      if (!title) {
        alert("제목을 입력하십시오");
        return;
      }
      if (!editorJSON) return
      let dto: SaveBlogPostReq = {
        id: idNumber,
        title: title,
        page_json: editorJSON,
        page_html: editorHTML
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

      {/* <LexicalEditor editorState={editorState} setEditorState={setEditorState} initialContent={initialContent}/> */}
      {
        initContent !== null && <Tiptap initContent={initContent} setEditorJSON={setEditorJSON} setEditorHTML={setEditorHTML} />
      }      
      <div className="flex justify-end mt-2">
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </div>
  );
}