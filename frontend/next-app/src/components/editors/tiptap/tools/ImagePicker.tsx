import { uploadImage } from '@/lib/services/imageService';
import { Editor as TiptapEditor } from '@tiptap/react'
import { Image } from 'lucide-react';
import { useCallback, useRef } from 'react';

interface ToolbarProps {
    editor: TiptapEditor | null;
}

export const ImagePicker = ({ editor }: ToolbarProps) => {

    const fileInputRef = useRef<HTMLInputElement>(null);


    const openFilePicker = () => {
        fileInputRef.current?.click();
    }

    const addImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editor) return null;

        const file = e.target.files?.[0];
        if (!file) return;
        console.log(typeof (file));

        const formData = new FormData();
        formData.append('image', file);

        const url = await uploadImage(formData);

        //const objectUrl = URL.createObjectURL(file);
        const objectUrl = url.data

        // 에디터에 임시 이미지 삽입 (data-temp: true)
        editor.chain().focus().setImage({
            src: objectUrl, alt: file.name
            //  , 'data-temp': true : 임시 옵션
        }).run();
        // @TODO : 타입을 as any로 우회했는데 나중에 노트 새로 추가해서 고칠 것.
        e.target.value = "";     // 같은 파일 다시 선택 가능하게 초기화

    }, [editor])
    return (
        <>
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


        </>

    )
}