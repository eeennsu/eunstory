import type { Metadata } from 'next'
import { Nanum_Gothic } from 'next/font/google'
import { RootProvider } from '@/lib/providers'
import { TopLoadingBar, Toaster } from '@/features/common'

import 'react-vertical-timeline-component/style.min.css'
import '@/lib/css/globals.css'
import { Layout } from '@/features/layout'

const nanumGothic = Nanum_Gothic({
    weight: ['400', '700', '800'],
    fallback: ['Arial', 'Helvetica', 'sans-serif'],
    subsets: ['latin'],
})

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
            <body className={nanumGothic.className}>
                <RootProvider>
                    <TopLoadingBar />
                    <Toaster />
                    <Layout>{children}</Layout>
                </RootProvider>
            </body>
        </html>
    )
}
