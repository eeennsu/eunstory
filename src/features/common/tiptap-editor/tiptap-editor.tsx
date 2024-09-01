import { forwardRef, useImperativeHandle } from 'react'
import { EditorContent, useEditor, type EditorEvents } from '@tiptap/react'
import { TiptapToolbar, ToolbarButtonType } from './tiptap-toolbar'
import { common, createLowlight } from 'lowlight'
import {
    StarterKit,
    Image,
    ImageResize,
    Link,
    Placeholder,
    TextAlign,
    Strike,
    Underline,
    CodeBlockLowlight,
    ListItem,
    Indent,
    Markdown,
} from '@/features/common/tiptap-editor'

import { cn } from '@/lib/shadcn/shadcn-utils'

interface TiptapEditorProps {
    placeholder?: string
    wrapperClassName?: string
    editorClassName?: string
    toolbarClassName?: string
    onUpdate?: (props: EditorEvents['update']) => void
    previousContent?: string
    toolbarButtons?: ToolbarButtonType[]
    isAllToolbar?: boolean
}

export interface TiptapRefType {
    getHtml: () => string
    extractImgId: () => string[]
    isEmpty: () => boolean
}

export const TiptapEditor = forwardRef<TiptapRefType, TiptapEditorProps>(
    (
        {
            placeholder,
            wrapperClassName,
            editorClassName,
            toolbarClassName,
            onUpdate,
            previousContent,
            toolbarButtons,
            isAllToolbar = false,
        },
        ref
    ) => {
        const editor = useEditor({
            editorProps: {
                attributes: {
                    class: cn(
                        'outline-none p-3 border border-gray-100 bg-white rounded-b-xl flex-1 h-full overflow-y-auto w-[840px] prose prose-p:m-0 list-inside prose-headings:m-0 prose-hr:my-1 outline-none max-w-none [&_ol]:list-decimal [&_ul]:list-disc',
                        editorClassName
                    ),
                },
            },
            extensions: [
                StarterKit.configure({
                    bulletList: {
                        keepMarks: true, // 다른 스타일들 유지시키며 리스트 만들기
                        keepAttributes: false, // 사용자 정의 스타일이나 클래스 등이 적용되지 않고 기본 값으로 재설정됨
                        HTMLAttributes: {
                            class: 'marker:text-black',
                        },
                    },
                    orderedList: {
                        keepMarks: true,
                        keepAttributes: false,
                        HTMLAttributes: {
                            class: 'marker:text-black',
                        },
                    },
                    listItem: false,
                    codeBlock: false,
                }),
                ListItem,
                Strike,
                Underline,
                Link.configure({
                    HTMLAttributes: {
                        target: '_blank',
                    },
                }).extend({ inclusive: false }),
                TextAlign.configure({
                    types: ['paragraph'],
                }),
                Image.configure({
                    allowBase64: true,
                }),
                ImageResize.configure(),
                Placeholder.configure({
                    placeholder,
                }),
                CodeBlockLowlight.configure({
                    lowlight: createLowlight(common),
                }),
                Indent,

                Markdown.configure({
                    html: true, // Allow HTML input/output
                    tightLists: true, // No <p> inside <li> in markdown output
                    tightListClass: 'tight', // Add class to <ul> allowing you to remove <p> margins when tight
                    bulletListMarker: '-', // <li> prefix in markdown output
                    linkify: false, // Create links from "https://..." text
                    breaks: false, // New lines (\n) in markdown input are converted to <br>
                    transformPastedText: false, // Allow to paste markdown text in the editor
                    transformCopiedText: false, // Copied text is transformed to markdown
                }),
            ],
            onUpdate: onUpdate ? onUpdate : () => {},
            content: previousContent,
        })

        useImperativeHandle(
            ref,
            () => ({
                getHtml: () => {
                    return editor?.getHTML() || ''
                },
                extractImgId: () => {
                    const imgTags = editor?.getHTML().match(/<img[^>]+id="([^"]+)"[^>]*>/g) || []

                    return imgTags.map((tag) => {
                        const match = tag.match(/id="([^"]+)"/)
                        return match ? match[1] : ''
                    })
                },
                isEmpty: () => {
                    return editor?.isEmpty || false
                },
            }),
            [editor]
        )

        return (
            <section className={cn('flex flex-col flex-1', wrapperClassName)}>
                <TiptapToolbar
                    editor={editor}
                    toolbarClassName={toolbarClassName}
                    toolbarButtons={toolbarButtons}
                    isAllToolbar={isAllToolbar}
                />
                <EditorContent
                    editor={editor}
                    className='flex flex-col flex-1'
                    style={{ flexBasis: 0, minHeight: 0 }}
                />
            </section>
        )
    }
)

TiptapEditor.displayName = 'TiptapEditor'
