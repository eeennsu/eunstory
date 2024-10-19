import { NextResponse } from 'next/server'

// Health check
export const GET = async () => {
    console.log('postgresql db url', process.env.DATABASE_URL)
    return NextResponse.json({ status: 'ok!' })
}
