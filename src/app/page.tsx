import { FC } from 'react'

const HomePage: FC = async () => {
    console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL)
    console.log('DATABASE_URL:', process.env.DATABASE_URL)
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
    console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET)
    console.log('ADMIN_ID:', process.env.ADMIN_ID)
    console.log('ADMIN_NAME:', process.env.ADMIN_NAME)
    console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD)
    console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID)
    console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET)
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID)
    console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET)
    console.log('S3_UPLOAD_KEY:', process.env.S3_UPLOAD_KEY)
    console.log('S3_UPLOAD_SECRET:', process.env.S3_UPLOAD_SECRET)
    console.log('S3_UPLOAD_BUCKET:', process.env.S3_UPLOAD_BUCKET)
    console.log('S3_UPLOAD_REGION:', process.env.S3_UPLOAD_REGION)

    return <main className='page-container pt-32 pb-10'></main>
}

export default HomePage
