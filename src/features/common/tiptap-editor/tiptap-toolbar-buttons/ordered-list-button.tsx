import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { ListOrdered } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const OrderedListButton: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<ListOrdered className='size-[18px]' />}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            isActive={editor?.isActive('orderedList')}
        />
    )
}
