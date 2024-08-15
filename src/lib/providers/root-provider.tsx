'use client'

import type { FC, PropsWithChildren } from 'react'
import { NextAuthProvider } from '@/lib/providers'
import { Toaster } from '@/shared/ui/toaster'

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <NextAuthProvider>
            {children}
            <Toaster />
        </NextAuthProvider>
    )
}
