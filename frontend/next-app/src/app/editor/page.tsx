"use client";
import { saveBlogPost, SaveBlogPostReq } from "@/lib/services/blogService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Tiptap from "@/components/editors/tiptap/TiptabEditor";

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [editorJson, setEditorJSON] = useState<string | null>(null);
  const [editorHTML, setEditorHTML] = useState<string | null>(null);
  const router = useRouter();


  
  const handleSave = async () => {
    try {
      if (!title) {
        alert("제목을 입력하십시오");
        return;
      }
      if (!editorJson) return
      const dto: SaveBlogPostReq = {
        title: title,
        page_json: editorJson,
        page_html: editorHTML,
      };
      const res = await saveBlogPost(dto);

      if (res.status === 200) {
        router.push("/blog");
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
      <Tiptap setEditorJSON={setEditorJSON} setEditorHTML={setEditorHTML} />
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
