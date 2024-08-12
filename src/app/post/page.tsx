'use client'

import { routePaths } from '@/lib/route'
import { Button } from '@/shared/ui/button'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import type { FC } from 'react'

const PostListPage: FC = () => {
    const { data, status } = useSession()

    console.log('data', data)
    return (
        <main className='page-container max-w-[1200px] mx-auto'>
            <section className='flex justify-between w-full'>
                <h2>PostListPage</h2>
                <Button asChild>
                    <Link href={routePaths.post.create()}>Create</Link>
                </Button>
            </section>
        </main>
    )
}

export default PostListPage
