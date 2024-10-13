import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { Heading1 } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const Heading1Button: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<Heading1 className='size-[18px]' />}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor?.isActive('heading', { level: 1 })}
        />
    )
}
