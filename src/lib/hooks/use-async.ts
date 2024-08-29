import { useEffect } from 'react'

export const useAsync = (asyncFn: () => Promise<any>, dependencyArray: any[]) => {
    useEffect(() => {
        const asyncFunction = async () => {
            try {
                await asyncFn()
            } catch (error) {
                console.error(error)
            }
        }

        asyncFunction()
    }, [...dependencyArray])
}
