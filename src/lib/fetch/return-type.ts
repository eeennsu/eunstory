import type { NextRequest, NextResponse } from 'next/server'

type Params = {
    params: {
        [key: string]: string | undefined
    }
}

type NextApiFunction = (req: NextRequest, params: Params) => Promise<NextResponse>

// api route 에서 반환하는 response 의 data type을 추출하는 type
export type NextResponseData<T extends NextApiFunction> =
    Awaited<ReturnType<T>> extends NextResponse<infer K> ? K : never
