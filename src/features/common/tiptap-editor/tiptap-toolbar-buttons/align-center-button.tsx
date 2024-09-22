import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { AlignCenter } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const AlignCenterButton: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<AlignCenter className='size-[18px]' />}
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            isActive={editor?.isActive({ textAlign: 'center' })}
        />
    )
}
