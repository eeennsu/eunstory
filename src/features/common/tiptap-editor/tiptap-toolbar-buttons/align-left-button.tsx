import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { AlignLeft } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const AlignLeftButton: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<AlignLeft className='size-[18px]' />}
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
            isActive={editor?.isActive({ textAlign: 'left' })}
        />
    )
}
