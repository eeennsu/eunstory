import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { AlignRight } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const AlignRightButton: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<AlignRight className='size-[18px]' />}
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
            isActive={editor?.isActive({ textAlign: 'right' })}
        />
    )
}
