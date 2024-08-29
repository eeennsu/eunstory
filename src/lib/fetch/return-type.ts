import type { NextRequest, NextResponse } from 'next/server'

type Params = {
    params: {
        [key: string]: string | undefined
    }
}

type NextApiFunction = (req: NextRequest, params: Params) => Promise<NextResponse>

export type NextResponseData<T extends NextApiFunction> =
    Awaited<ReturnType<T>> extends NextResponse<infer K> ? K : never
