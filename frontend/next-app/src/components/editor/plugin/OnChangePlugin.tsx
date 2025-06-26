'use client'

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { EditorState } from "lexical";

type OnChangePluginProps = {
    onChange : (editorState:EditorState) => void // 상위 컴포넌트에서 받는 onChange 함수가 리턴값이 없기 때문에 void로 리턴

}

export default function OnChangePlugin({ onChange } : OnChangePluginProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
      console.log("editorState : ",editorState)

    });
  }, [editor, onChange]);
  return null;
}
