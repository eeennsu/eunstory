import { FC } from 'react'
import { Toaster as SonnerToaster } from 'sonner'

export const Toaster: FC = () => {
    return (
        <SonnerToaster
            toastOptions={{
                unstyled: true,
                className: 'w-full',
            }}
            position='top-center'
        />
    )
}
