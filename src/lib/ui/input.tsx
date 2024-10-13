import * as React from 'react'

import { cn } from '@/lib/shadcn/shadcn-utils'
import { cva, VariantProps } from 'class-variance-authority'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const inputVariants = cva(
    'flex h-10 w-full rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                clear: 'border-0 bg-background focus:outline-none focus:ring-0 focus:border-0 shadow-none',
                secondary:
                    'bg-gray-800 placeholder:text-gray-500 text-gray-300 border border-slate-700 focus:border-slate-700 focus:outline-none',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, variant, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(inputVariants({ variant }), className)}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = 'Input'

export { Input }
