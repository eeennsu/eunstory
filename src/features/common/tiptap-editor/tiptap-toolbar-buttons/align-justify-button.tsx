import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { AlignJustify } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const AlignJustifyButton: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<AlignJustify className='size-[18px]' />}
            onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
            isActive={editor?.isActive({ textAlign: 'justify' })}
        />
    )
}
