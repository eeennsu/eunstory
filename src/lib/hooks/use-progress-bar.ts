'use client'

import { startProgress, stopProgress, useRouter } from 'next-nprogress-bar'

export const useProgressBar = () => {
    const startBar = () => startProgress()
    const stopBar = () => stopProgress()
    const barRouter = useRouter()

    const executeWithProgress = (callback: Function) => {
        startBar()
        callback().finally(() => stopBar())
    }

    return {
        barRouter,
        startBar,
        stopBar,
        executeWithProgress,
    }
}
