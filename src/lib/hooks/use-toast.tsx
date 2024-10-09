import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-react'
import { ReactNode } from 'react'
import { toast as sonnerToast } from 'sonner'
import { cn } from '../shadcn/shadcn-utils'

interface ToastProps {
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    description?: string
    className?: string
    duration?: number
}

const Toast = ({ title, type, className, description }: ToastProps) => {
    const icon: Record<typeof type, ReactNode> = {
        success: <CircleCheck className='text-green-300' />,
        error: <CircleX className='text-red-400' />,
        warning: <CircleAlert className='text-yellow-400' />,
        info: <Info className='text-blue-400' />,
    }

    return (
        <div
            className={cn(
                'flex items-center gap-3.5 p-3 rounded-lg shadow-xl border-2 border-gray-600 bg-gray-800',
                className
            )}>
            <span className='flex-shrink-0'>{icon[type]}</span>
            <div className='flex flex-col gap-1'>
                <p className='text-base font-bold text-gray-300'>{title}</p>
                {description && <p className='text-sm text-gray-400'>{description}</p>}
            </div>
        </div>
    )
}

export const useToast = () => {
    const toast = ({ title, duration = 3500, type, className, description }: ToastProps) =>
        sonnerToast(
            <Toast
                title={title}
                type={type}
                className={className}
                description={description}
                duration={duration}
            />,
            { duration }
        )

    return { toast }
}
