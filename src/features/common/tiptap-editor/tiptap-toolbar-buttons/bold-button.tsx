import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { Bold } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const BoldButton: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<Bold className='size-[18px]' />}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            isActive={editor?.isActive('bold')}
        />
    )
}
