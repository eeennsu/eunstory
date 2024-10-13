import type { FC, PropsWithChildren, ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/ui/tooltip'
import { Info } from 'lucide-react'

interface Props {
    content: ReactNode
}

export const CustomTooltip: FC<PropsWithChildren<Props>> = ({ children, content }) => (
    <TooltipProvider delayDuration={100}>
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent className='bg-gray-800 text-gray-100 rounded-md border border-gray-600 px-4 py-3 shadow-lg max-w-xs'>
                <div className='flex items-center gap-3'>
                    <Info className='text-indigo-400 size-4' />
                    <p className='text-sm flex-1 text-gray-200'>{content}</p>
                </div>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)
