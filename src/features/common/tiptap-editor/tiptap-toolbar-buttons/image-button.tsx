import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { ACCEPTED_MEME_TYPE } from '@/features/common/tiptap-editor'
import { ImageIcon } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const ImageButton: FC<Props> = ({ editor }) => {
    const setImage = async (files: FileList | null) => {
        if (!editor) return

        if (!files || files.length === 0) {
            alert('이미지 파일을 찾을 수 없습니다.')
            return
        }

        if (files[0] && files[0].size >= 1024 * 1024 * 5) {
            alert('이미지 파일의 크기는 5MB 미만으로 업로드 가능합니다.')
            return
        }

        editor
            .chain()
            .focus()
            .setImage({ src: URL.createObjectURL(files[0]) })

        // const response = await customImageUploadFile(files)

        // if (response) {
        //     response.forEach((file) => {
        //         editor.chain().focus().setImage({ src: file.file_url }).run()
        //     })

        //     editor.chain().enter().focus('end').run()
        // } else {
        //     alert('이미지 업로드에 실패했습니다.')
        // }
    }

    return (
        <TiptapCommonButton
            icon={<ImageIcon className='size-5' />}
            className='relative'>
            <input
                type='file'
                accept={ACCEPTED_MEME_TYPE}
                className='absolute inset-0 rounded-md outline-none opacity-0 size-full cursor-pointer'
                onChange={(e) => setImage(e?.target?.files)}
            />
        </TiptapCommonButton>
    )
}
