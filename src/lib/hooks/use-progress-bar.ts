'use client'

import { startProgress, stopProgress, useRouter } from 'next-nprogress-bar'

export const useProgressBar = () => {
    const startBar = () => startProgress()
    const stopBar = () => stopProgress()
    const router = useRouter()

    return {
        router,
        startBar,
        stopBar,
    }
}
