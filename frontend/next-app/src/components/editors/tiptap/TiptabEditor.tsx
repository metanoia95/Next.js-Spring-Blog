'use client'

import './styles.scss'
import Blockquote from '@tiptap/extension-blockquote'

import Bold from '@tiptap/extension-bold'
import { useEditor, EditorContent } from '@tiptap/react'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Heading from '@tiptap/extension-heading'
import Strike from '@tiptap/extension-strike'
import { NodeToolbar } from './tools/NodeToolbar'
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useState } from 'react'
import { all, createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { MarkToolbar } from './tools/MarkToolbar'
import Italic from '@tiptap/extension-italic'
import Image from '@tiptap/extension-image'
import { Dropcursor } from '@tiptap/extensions'
import HardBreak from '@tiptap/extension-hard-break'

const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

type EditorProps = {
  initContent?: string | null;
  setEditorJSON : (value : string) => void;
  setEditorHTML : (value : string) => void;
};


const Tiptap = ({initContent, setEditorJSON, setEditorHTML} : EditorProps) => {
  const [_, forceUpdate] = useState(0);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false
      }),
    // HardBreak를 별도 설정으로 명시
    HardBreak.configure({
      keepMarks: true,       // 굵게/기울임 같은 마크 유지
    }),
      Strike,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Bold,
      Italic,
      Blockquote,
      Image,
      Dropcursor

    ],
    content: initContent,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: true,
    autofocus: true,
    editable: true,
    injectCSS: false,
    onUpdate: ({editor})=>{
      setEditorJSON(JSON.stringify(editor.getJSON()));
      setEditorHTML(editor.getHTML());
    } , // 상태 변경 → 리렌더링 강제
    shouldRerenderOnTransaction: true,

  });
  

  

  useEffect(()=> {
    if(!editor) return;
      setEditorHTML(editor.getHTML());
      setEditorJSON(JSON.stringify(editor.getJSON()));
      
},[editor, setEditorHTML,setEditorJSON])

  return (
    <>
      {/* 헤딩 툴바 */}
      <div className="toolbar flex flex-row py-2">
        <NodeToolbar editor={editor} />
        <MarkToolbar editor={editor} />
      </div>
      <EditorContent editor={editor} className='tiptap min' />
    </>
  )

}

export default Tiptap