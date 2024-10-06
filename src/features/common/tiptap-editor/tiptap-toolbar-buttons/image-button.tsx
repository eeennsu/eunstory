import { type FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { ImageIcon } from 'lucide-react'
import { callToast } from '@/lib/fetch'
import { useS3Upload } from 'next-s3-upload'
import { useImageUploadStore } from '@/entities/post'
interface Props {
    editor: Editor | null
}

const ACCEPTED_MEME_TYPE = `image/jpeg,image/png,image/gif,image/webp,image/bmp,image/tiff,image/vnd.microsoft.icon,image/x-icon,image/heif,image/heic,image/vnd.adobe.photoshop,image/jp2,image/jpx,image/jpm,image/jxr,image/heif-sequence,image/heic-sequence,image/dicom-rle,image/jbig,image/jbig2,image/x-rle,image/vnd.zbrush.pcx`
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const ImageButton: FC<Props> = ({ editor }) => {
    const setIsUploading = useImageUploadStore((state) => state.setIsUploading)
    const { uploadToS3 } = useS3Upload()

    const doNotUpload = () => {
        callToast({
            variant: 'warning',
            position: 'top',
            title: '이미지 파일을 불러올 수 없습니다.',
            description: '다시 시도해주세요.',
        })
    }

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

        setIsUploading(true)

        try {
            const { url } = await uploadToS3(file)

            if (url) {
                editor.chain().focus().setImage({ src: url }).createParagraphNear().run()
            } else {
                doNotUpload()
            }
        } catch (error) {
            console.error(error)
            doNotUpload()
        } finally {
            setIsUploading(false)
        }
    }

    // aws s3 free tier 해제 후 이 코드 사용 (2025년 9월 22일? 까지 무료인듯)
    // const addImageWithLink = () => {
    //     const url = window.prompt('URL')

    //     if (url) {
    //         editor?.chain().focus().setImage({ src: url }).createParagraphNear().run()
    //     }
    // }

    return (
        <TiptapCommonButton
            icon={
                <ImageIcon
                    className='size-[18px]'
                    // onClick={addImageWithLink}
                />
            }
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
