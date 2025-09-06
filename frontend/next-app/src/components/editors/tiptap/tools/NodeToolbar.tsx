import { uploadImage } from '@/lib/services/imageService';
import { Editor as TiptapEditor } from '@tiptap/react'
import { Code, Heading1, Heading2, Heading3, Image } from 'lucide-react';
import { useCallback, useRef } from 'react';

interface ToolbarProps {
  editor: TiptapEditor | null;
}


export const NodeToolbar = ({ editor }: ToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  if (!editor) return null;

  const openFilePicker = ()=> {
        fileInputRef.current?.click();
  }

  const addImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(typeof(file));

    let formData = new FormData();
    formData.append('image', file);

    let url = await uploadImage(formData);

    //const objectUrl = URL.createObjectURL(file);
    const objectUrl = url.data

    // 에디터에 임시 이미지 삽입 (data-temp: true)
    editor.chain().focus().setImage({ src: objectUrl, alt: file.name
    //  , 'data-temp': true
     } as any).run();
    // @TODO : 타입을 as any로 우회했는데 나중에 노트 새로 추가해서 고칠 것.
    e.target.value = "";     // 같은 파일 다시 선택 가능하게 초기화

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
        <button onClick={openFilePicker}>
          <Image />
        </button>
      </div>
      <input
        ref={fileInputRef}
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={addImage}
      />
    </div>

  )
}
