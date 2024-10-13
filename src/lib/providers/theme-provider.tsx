'use client'

import { useEffect, useState, type FC, type PropsWithChildren } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isMount, setIsMount] = useState<boolean>(false)

    useEffect(() => {
        setIsMount(true)
    }, [])

    if (!isMount) {
        return null
    }

    return (
        <NextThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem>
            {children}
        </NextThemeProvider>
    )
}
