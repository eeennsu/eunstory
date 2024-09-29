'use client'

import { useAdminSession } from '@/lib/hooks'
import { mainPath } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import Link from 'next/link'
import type { FC } from 'react'

export const PostListHeadWidget: FC = () => {
    const { isAdminAuthorized } = useAdminSession()

    return (
        <section className='flex justify-between w-full mt-4'>
            <h2>PostListPage</h2>
            {isAdminAuthorized && (
                <div className='flex gap-3'>
                    <Button asChild>
                        <Link href={mainPath.post.create()}>Create Post</Link>
                    </Button>
                    <Button asChild>
                        <Link href={mainPath.post.temporaryList()}>Temporary Saved Posts</Link>
                    </Button>
                    <Button asChild>
                        <Link href={mainPath.post.edit()}>Edit Post Order</Link>
                    </Button>
                </div>
            )}
        </section>
    )
}
