'use client'

import type { FC, PropsWithChildren } from 'react'
import { NextAuthProvider } from '@/lib/providers'

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <NextAuthProvider>{children}</NextAuthProvider>
        </>
    )
}
