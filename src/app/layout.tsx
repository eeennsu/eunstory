import type { Metadata } from 'next'
import { RootProvider } from '@/lib/providers'
import { TopLoadingBar, Toaster } from '@/features/common'
import 'react-vertical-timeline-component/style.min.css'
import '@/lib/css/globals.css'
import { Layout } from '@/features/layout'
import { nanumGothic } from '@/lib/font'
import { SITE_URL } from '@/shared/constants'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: '방은수 블로그',
    description: '프론트엔드 개발자 방은수의 회고 블로그입니다.',
    icons: {
        icon: '/favicon.ico',
    },
    authors: [
        {
            name: '방은수',
            url: 'https://github.com/eeennsu',
        },
    ],
    twitter: {
        title: '방은수 - 프론트엔드 개발자 블로그',
        description: 'Next.js 와 Typescript로 개발을 하는 프론트엔드 개발자 방은수의 블로그입니다.',
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: SITE_URL,
        languages: {
            en: '/en',
            ko: '/',
        },
    },
    openGraph: {
        type: 'website',
        url: SITE_URL,
        title: '방은수 - 프론트엔드 개발자 블로그',
        description: 'Next.js 와 Typescript로 개발을 하는 프론트엔드 개발자 방은수의 블로그입니다.',
        locale: 'ko_KR',
    },
    keywords:
        '프론트엔드 개발자, 방은수, 이력서, 포트폴리오, 블로그, Bang Eunsu, React.js, React, Next.js, Next, Typescript, ts, Frontend Developer, Resume, Portfolio',
    verification: {
        google: 'kIt_sr7AcMn_DeNc6Ed3boJTDtXOtBRZQAFfeW-nI9U',
    },
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
