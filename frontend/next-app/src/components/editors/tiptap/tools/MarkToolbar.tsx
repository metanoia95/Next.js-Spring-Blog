import { Editor as TiptapEditor } from '@tiptap/react'
import { Quote } from 'lucide-react';
import { MdFormatBold, MdFormatItalic, MdFormatStrikethrough } from 'react-icons/md';

interface ToolbarProps {
    editor: TiptapEditor | null;
}


export const MarkToolbar = ({ editor }: ToolbarProps) => {

    if (!editor) return null;

    return (
        <div className="flex flex-row ">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <MdFormatBold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <MdFormatItalic />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <MdFormatStrikethrough />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <Quote />
            </button>
        </div>

    )
}
