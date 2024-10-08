import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { RootProvider } from '@/lib/providers'
import { TopLoadingBar, Toaster } from '@/features/common'
import { Footer, Header } from '@/features/layout'

import 'react-vertical-timeline-component/style.min.css'
import '@/lib/css/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Eunstory',
    description: 'A personal blog by front-end developer Eunsu Bang',
    
    
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <RootProvider>
                    <TopLoadingBar />
                    <Toaster />
                    <div className='flex w-full min-h-dvh flex-col items-center justify-center text-foreground'>
                        <Header />
                        <div className='flex flex-col w-full flex-1 bg-slate-800/85'>{children}</div>
                        <Footer />
                    </div>
                </RootProvider>
            </body>
        </html>
    )
}
