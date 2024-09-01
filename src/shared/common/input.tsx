import { cn } from '@/lib/shadcn/shadcn-utils'
import { forwardRef, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    as?: 'input' | 'textarea'
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
    ({ as = 'input', className, ...props }, ref) => {
        const Comp = as === 'input' ? 'input' : 'textarea'

        return (
            <Comp
                // @ts-ignore
                ref={ref}
                className={cn(
                    'relative w-[320px] h-10 text-sm max-h-[200px] rounded-lg resize-none shadow-xs bg-white px-4 py-3 outline-none placeholder:text-slate-400 disabled:bg-gray-200 placeholder:disabled:opacity-70',
                    className
                )}
                {...props}
            />
        )
    }
)

Input.displayName = 'Input'
