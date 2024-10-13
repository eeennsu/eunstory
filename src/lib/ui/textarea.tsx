import * as React from 'react'

import { cn } from '@/lib/shadcn/shadcn-utils'
import { cva, VariantProps } from 'class-variance-authority'

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textareaVariants> {}

const textareaVariants = cva(
    'flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 resize-none',
    {
        variants: {
            variant: {
                default:
                    'border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                clear: 'border-0 bg-background focus:outline-none focus:ring-0 focus:border-0 shadow-none',
                secondary:
                    'bg-gray-800 placeholder:text-gray-500 text-gray-300 border border-slate-700 rounded-lg px-4 py-3 focus:border-slate-700 focus:outline-none',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, variant, ...props }, ref) => {
    return (
        <textarea
            className={cn(textareaVariants({ variant }), className)}
            ref={ref}
            {...props}
        />
    )
})
Textarea.displayName = 'Textarea'

export { Textarea }
