import NextAuth from 'next-auth/next'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

const ENV = {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    ADMIN_ID: process.env.ADMIN_ID,
    ADMIN_NAME: process.env.ADMIN_NAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY,
    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET,
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
}

console.log('Environment Variable Status:', ENV)

export { handler as GET, handler as POST }
