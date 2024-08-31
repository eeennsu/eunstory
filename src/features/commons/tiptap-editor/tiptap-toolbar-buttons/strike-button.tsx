import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { Strikethrough } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const StrikeButton: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<Strikethrough className='size-[18px]' />}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            isActive={editor?.isActive('strike')}
        />
    )
}
