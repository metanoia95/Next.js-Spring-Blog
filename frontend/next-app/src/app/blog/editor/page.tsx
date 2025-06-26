"use client";
import Editor from "@/components/editor/editor";
import { saveBlogPost, SaveBlogPostReq } from "@/lib/services/blogService";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditorPage() {
const [title, setTitle] = useState("");
const [editorState, setEditorState] = useState<string | null>(null);
const router = useRouter();
 

  const handleSave = async () => {
    try {
      if(!editorState) return
      const dto: SaveBlogPostReq = {
        title : title,
        page_json: editorState,
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
    <div className="flex flex-col justify-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="post-title border-b outline-none justify-center"
      />

      <Editor editorState={editorState} setEditorState={setEditorState} />
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
