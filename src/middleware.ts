import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { assertValue } from './lib/utils'
import { mainPath } from './lib/route'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: assertValue(process.env.NEXTAUTH_SECRET) })

    if (!token) {
        return NextResponse.next()
    }

    if (token?.name !== assertValue(process.env.ADMIN_NAME) || !token?.isAdmin) {
        const redirectUrl = new URL(mainPath.home(), request.url)

        redirectUrl.searchParams.set('unauthenticated', 'true')
        redirectUrl.searchParams.set('from', request.nextUrl.pathname)

        return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/post/create', '/post/edit/:path*', '/post/temporary-list', '/admin', '/admin/:path*'],
}
