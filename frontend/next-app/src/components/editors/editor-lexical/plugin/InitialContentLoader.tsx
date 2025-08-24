'use client'

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

// 초기 컨텐츠 로더
export default function InitialContentLoader({ initialContent }: { initialContent: string | undefined }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    
    if (!initialContent) return;
    const editorState = editor.parseEditorState(initialContent);
    editor.setEditorState(editorState);
  }, [initialContent, editor]);

  return null;
}