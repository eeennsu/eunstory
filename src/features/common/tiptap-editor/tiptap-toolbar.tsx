import type { FC } from 'react'
import { Editor } from '@tiptap/react'
import {
    BoldButton,
    BulletListButton,
    ImageButton,
    OrderedListButton,
    CodeButton,
    Heading1Button,
    Heading2Button,
    Heading3Button,
    ItalicButton,
    StrikeButton,
    AlignLeftButton,
    AlignCenterButton,
    AlignRightButton,
    AlignJustifyButton,
} from '@/features/common/tiptap-editor/tiptap-toolbar-buttons'
import { cn } from '@/lib/shadcn/shadcn-utils'

export type ToolbarButtonType =
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'bold'
    | 'italic'
    | 'strike'
    | 'alignLeft'
    | 'alignCenter'
    | 'alignRight'
    | 'alignJustify'
    | 'bulletList'
    | 'orderedList'
    | 'image'
    | 'code'

interface TiptapToolbarProps {
    editor: Editor | null
    toolbarClassName?: string
    toolbarButtons?: ToolbarButtonType[]
    isAllToolbar?: boolean
}

const buttonComponents: { [key in ToolbarButtonType]: FC<{ editor: Editor | null }> } = {
    heading1: Heading1Button,
    heading2: Heading2Button,
    heading3: Heading3Button,
    bold: BoldButton,
    italic: ItalicButton,
    strike: StrikeButton,
    alignLeft: AlignLeftButton,
    alignCenter: AlignCenterButton,
    alignRight: AlignRightButton,
    alignJustify: AlignJustifyButton,
    bulletList: BulletListButton,
    orderedList: OrderedListButton,
    code: CodeButton,
    image: ImageButton,
}

const renderButtons = (editor: Editor, buttons: ToolbarButtonType[] | null | undefined, isAllToolbar: boolean) => {
    const toolbarButtons = isAllToolbar ? (Object.keys(buttonComponents) as ToolbarButtonType[]) : [...new Set(buttons)]

    return toolbarButtons.map((button) => {
        const ButtonComponent = buttonComponents[button]

        return (
            <ButtonComponent
                key={button}
                editor={editor}
            />
        )
    })
}

export const TiptapToolbar: FC<TiptapToolbarProps> = ({
    editor,
    toolbarClassName,
    toolbarButtons,
    isAllToolbar = false,
}) => {
    if (!editor) return null

    return (
        <section className={cn('flex border gap-2 border-b-0 border-gray-100 p-2 rounded-t-xl', toolbarClassName)}>
            {renderButtons(editor, toolbarButtons, isAllToolbar)}
        </section>
    )
}
