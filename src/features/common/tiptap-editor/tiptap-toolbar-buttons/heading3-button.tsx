import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { Heading3 } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const Heading3Button: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<Heading3 className='size-[18px]' />}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor?.isActive('heading', { level: 3 })}
        />
    )
}
