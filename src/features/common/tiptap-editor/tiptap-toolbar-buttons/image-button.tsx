import { useEffect, type FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { ImageIcon } from 'lucide-react'
import { callToast } from '@/lib/fetch'

interface Props {
    editor: Editor | null
}

const ACCEPTED_MEME_TYPE = `image/jpeg,image/png,image/gif,image/webp,image/bmp,image/tiff,image/vnd.microsoft.icon,image/x-icon,image/heif,image/heic,image/vnd.adobe.photoshop,image/jp2,image/jpx,image/jpm,image/jxr,image/heif-sequence,image/heic-sequence,image/dicom-rle,image/jbig,image/jbig2,image/x-rle,image/vnd.zbrush.pcx`
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const ImageButton: FC<Props> = ({ editor }) => {
    const setImage = async (files: FileList | null) => {
        if (!editor) return

        if (!files || files.length === 0) {
            callToast({
                variant: 'warning',
                position: 'top',
                title: '이미지 파일을 찾을 수 없습니다.',
                description: '다시 시도해주세요.',
            })
            return
        }

        const file = files[0]

        if (!file.type.startsWith('image/')) {
            callToast({
                variant: 'warning',
                position: 'top',
                title: '이미지 파일만 업로드 가능합니다.',
                description: '다시 시도해주세요.',
            })
            return
        }

        if (file.size > MAX_FILE_SIZE) {
            callToast({
                variant: 'warning',
                position: 'top',
                title: '이미지 파일의 크기가 너무 큽니다.',
                description: '10MB 이하의 이미지 파일만 업로드 가능합니다.',
            })

            return
        }

        const url = URL.createObjectURL(file)

        if (url) {
            editor.chain().focus().setImage({ src: url }).createParagraphNear().run()
        } else {
            callToast({
                variant: 'warning',
                position: 'top',
                title: '이미지 파일을 불러올 수 없습니다.',
                description: '다시 시도해주세요.',
            })
        }
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
