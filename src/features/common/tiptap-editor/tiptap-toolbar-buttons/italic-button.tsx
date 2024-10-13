import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { Italic } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const ItalicButton: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<Italic className='size-[18px]' />}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            isActive={editor?.isActive('italic')}
        />
    )
}
