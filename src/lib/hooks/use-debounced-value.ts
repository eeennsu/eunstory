import { useEffect, useRef, useState } from 'react'
import deepEqual from 'deep-equal'

export const useDebouncedValue = <T>(value: T, delay: number = 1000): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    const previousValueRef = useRef<T>(value)
    const isObject = typeof value === 'object' && value !== null

    useEffect(() => {
        if (isObject) {
            if (deepEqual(value, previousValueRef.current)) {
                return
            }
        }

        const handler = setTimeout(() => {
            setDebouncedValue(value)

            if (isObject) {
                previousValueRef.current = value
            }
        }, delay)

        return () => {
            clearTimeout(handler)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, delay])

    return debouncedValue
}
