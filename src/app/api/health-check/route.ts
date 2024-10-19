import { NextResponse } from 'next/server'

// Health check
export const GET = async () => {
    return NextResponse.json({ status: 'ok!' })
}
