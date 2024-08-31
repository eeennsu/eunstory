import { useCallback, useState } from 'react'

type CallbackFunc<T = void> = (() => void) | (() => Promise<T>)

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    const startLoading = () => {
        setIsLoading(true)
    }

    const endLoading = () => {
        setIsLoading(false)
    }

    const execute = useCallback(async <T>(callbackFn?: CallbackFunc<T>) => {
        try {
            startLoading()
            error !== null && setError(null)

            const result = await callbackFn?.()
            return result
        } catch (error) {
            setError(error as Error)
        } finally {
            endLoading()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        isLoading,
        startLoading,
        endLoading,
        execute,
        error,
    }
}
