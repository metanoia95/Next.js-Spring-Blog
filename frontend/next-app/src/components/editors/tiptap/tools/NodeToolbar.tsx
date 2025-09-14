import { Editor as TiptapEditor } from '@tiptap/react'
import { Code, Heading1, Heading2, Heading3 } from 'lucide-react';
import { ImagePicker } from './ImagePicker';


interface ToolbarProps {
  editor: TiptapEditor | null;
}


export const NodeToolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;
  
  return (
    <div className="flex flex-row">

      {/* 헤딩 */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <Heading1 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <Heading2 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <Heading3 />
      </button>

      {/* 코드 블록 */}
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <Code />
      </button>
      {/* 이미지 */}
      <ImagePicker editor={editor}/>
    </div>

  )
}
