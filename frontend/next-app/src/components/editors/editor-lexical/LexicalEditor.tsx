"use client";
import { ComponentProps, FC, } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ToolbarPlugin } from "@/components/editors/editor-lexical/plugin/ToolbarPlugin";

import "./editor.css";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { CodeHighlightPlugin } from "./plugin/CodeHighlightPlugin";
import { InlineToolbarPlugin } from "./plugin/InlineToolbarPlugin";
import { MarkdownPlugin } from "./plugin/MarkdownPlugin";
import { theme } from "./editorconfig/theme";
import { nodes } from "./editorconfig/nodes";
import InitialContentLoader from "./plugin/InitialContentLoader";
import { AutoFocusPlugin } from "./plugin/AutoFocusPlugin";
import OnChangePlugin from "./plugin/OnChangePlugin";
import { EditorState } from "lexical";



const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] = {
  namespace: "MyEditor",
  theme,
  onError: (error) => console.log(error),
  nodes: nodes, // 에디터에서 사용할 Node 클래스 전달
};

type EditorProps = {
  editorState : string | null,
  setEditorState : (value : string) => void;
  initialContent?: string; 
};



const LexicalEditor: FC<EditorProps> =  ({setEditorState, initialContent}) => {

  const handleChange = (editorState : EditorState) => {
     const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));

  }


  return (
    <div className="flex flex-col justify-center">
     
              
      <LexicalComposer initialConfig={initialConfig}>

        <div className="flex flex-row">
          <ToolbarPlugin />
          <InlineToolbarPlugin />
          <InitialContentLoader initialContent={initialContent} />
        </div>
        <div className="relative min-h-[150px] border border-gray-300 p-4 rounded-md">
          <RichTextPlugin
          
            contentEditable={
              <ContentEditable // 텍스트 입력이 일어나는 에디터 영역
                className="editor-input outline-none min-h-[150px]"
                aria-placeholder={"아무거나 입력하셈"}
                tabIndex={0}
                placeholder={
                  <div className="editor-placeholder pointer-events-none absolute top-4 left-4 text-gray-400">
                    아무거나 입력하셈
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        {/* undo, redo 기능 추가 */}
        <HistoryPlugin />
        {/* 리스트 기능 추가 */}
        <ListPlugin />
        {/* 체크리스트 기능 추가 */}
        <CheckListPlugin />
        {/* 코드 블록 추가 */}
        <CodeHighlightPlugin />
        {/* 마크다운 */}
        <MarkdownPlugin />
        {/* 변화감지  */}
        <OnChangePlugin onChange={handleChange} />

        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  );
};

export default LexicalEditor;




