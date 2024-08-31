import type { FC } from 'react'
import type { Editor } from '@tiptap/react'
import { TiptapCommonButton } from './tiptap-common-button'
import { CodeXml } from 'lucide-react'

interface Props {
    editor: Editor | null
}

export const CodeButton: FC<Props> = ({ editor }) => {
    return (
        <TiptapCommonButton
            icon={<CodeXml className='size-5' />}
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            isActive={editor?.isActive('code')}
        />
    )
}
