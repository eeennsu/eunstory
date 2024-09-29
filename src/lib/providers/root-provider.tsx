'use client'

import type { FC, PropsWithChildren } from 'react'
import { NextAuthProvider } from '@/lib/providers'
import { Toaster } from '@/lib/ui/toaster'
import { ThemeProvider } from 'next-themes'

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <NextAuthProvider>
            <ThemeProvider
                attribute='class'
                defaultTheme='dark'
                enableSystem>
                {children}
                <Toaster />
            </ThemeProvider>
        </NextAuthProvider>
    )
}
