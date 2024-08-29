'use client'

import { startProgress, stopProgress, useRouter } from 'next-nprogress-bar'

export const useProgressBar = () => {
    const startBar = () => startProgress()
    const stopBar = () => stopProgress()
    const router = useRouter()

    const executeWithProgress = (callback: () => Promise<void>) => {
        startBar()
        callback().finally(() => stopBar())
    }

    return {
        router,
        startBar,
        stopBar,
        executeWithProgress,
    }
}
