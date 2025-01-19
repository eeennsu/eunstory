'use client'

import type { FC, PropsWithChildren } from 'react'
import { NextAuthProvider, ThemeProvider } from '@/lib/providers'

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <NextAuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </NextAuthProvider>
    )
}
