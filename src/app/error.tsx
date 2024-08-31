'use client'

import type { NextPage } from 'next'
import { ErrorLayout } from '@/features/error'
import { useEffect } from 'react'

interface Props {
    error: Error | string
    reset: () => void
}

const ErrorPage: NextPage<Props> = ({ error, reset }) => {
    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <ErrorLayout
            error={error}
            reset={reset}
        />
    )
}

export default ErrorPage
