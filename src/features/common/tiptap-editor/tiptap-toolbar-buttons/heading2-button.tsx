import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { Heading2 } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const Heading2Button: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<Heading2 className='size-[18px]' />}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor?.isActive('heading', { level: 2 })}
        />
    )
}
