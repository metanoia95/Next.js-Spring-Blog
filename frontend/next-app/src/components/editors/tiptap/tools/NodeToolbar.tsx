import { Editor as TiptapEditor } from '@tiptap/react'
import { Code, Heading1, Heading2, Heading3, Image } from 'lucide-react';
import { useCallback } from 'react';

interface ToolbarProps {
  editor: TiptapEditor | null;
}


export const NodeToolbar = ({ editor }: ToolbarProps) => {

  if (!editor) return null;

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])




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
      <div className="button-group">
        <button onClick={addImage}>
          <Image />
        </button>
      </div>

    </div>

  )
}
