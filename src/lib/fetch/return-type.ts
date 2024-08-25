import type { NextRequest, NextResponse } from 'next/server'

type Params = {
    params: {
        [key: string]: string | undefined
    }
}

export type NextResponseData<T extends (req: NextRequest, params: Params) => Promise<NextResponse>> =
    Awaited<ReturnType<T>> extends NextResponse<infer K> ? K : never
