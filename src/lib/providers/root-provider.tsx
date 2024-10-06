'use client'

import type { FC, PropsWithChildren } from 'react'
import { NextAuthProvider, ThemeProvider } from '@/lib/providers'
import { Toaster } from '@/lib/ui/toaster'

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <NextAuthProvider>
            <ThemeProvider>
                {children}
                {<Toaster />}
            </ThemeProvider>
        </NextAuthProvider>
    )
}
