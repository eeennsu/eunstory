import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { List } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const BulletListButton: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<List className='size-[18px]' />}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            isActive={editor?.isActive('bulletList')}
        />
    )
}
