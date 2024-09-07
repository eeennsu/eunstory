import { useEffect, useState } from 'react'

export const useAsync = (asyncFn: () => Promise<any>, dependencyArray: any[]) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        ;(async () => {
            error && setError(null)

            try {
                await asyncFn()
            } catch (error) {
                console.error(error)
                setError(error as Error)
            } finally {
                setIsLoading(false)
            }
        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencyArray])

    return {
        isLoading,
        error,
    }
}
