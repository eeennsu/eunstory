import { Node } from '@tiptap/core'

export const Indent = Node.create({
    name: 'indent',
    addKeyboardShortcuts: () => {
        return {
            Tab: ({ editor }) => {
                if (editor.isActive('listItem')) return false

                editor.chain().focus().insertContent('    ').run()

                return true
            },
        }
    },
})
