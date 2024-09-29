import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { assertValue } from './lib/utils'
import { JWT } from 'next-auth'
import { mainPath } from './lib/route'

export async function middleware(request: NextRequest) {
    // @ts-ignore
    const token = (await getToken({ req: request, secret: assertValue(process.env.NEXTAUTH_SECRET) })) as JWT

    if (!token) {
        return NextResponse.next()
    }

    if (token?.name !== assertValue(process.env.ADMIN_NAME) || !token?.isAdmin) {
        console.log('Unauthenticated access')
        return NextResponse.redirect(new URL(mainPath.home(), request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/post/create', '/post/edit/:path*', '/post/temporary-list', '/admin', '/admin/:path*'],
}