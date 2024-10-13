import NextAuth from 'next-auth/next'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

const ENV = {
    DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not Set',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ? 'Set' : 'Not Set',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'Set' : 'Not Set',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set',
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ? 'Set' : 'Not Set',
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ? 'Set' : 'Not Set',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not Set',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not Set',
    ADMIN_ID: process.env.ADMIN_ID ? 'Set' : 'Not Set',
    ADMIN_NAME: process.env.ADMIN_NAME ? 'Set' : 'Not Set',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'Set' : 'Not Set',
    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY ? 'Set' : 'Not Set',
    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET ? 'Set' : 'Not Set',
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET ? 'Set' : 'Not Set',
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION ? 'Set' : 'Not Set',
}

console.log('Environment Variable Status:', ENV)

export { handler as GET, handler as POST }
