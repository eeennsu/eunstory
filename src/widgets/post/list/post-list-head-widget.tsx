'use client'

import { useAdminAuth } from '@/lib/hooks'
import { routePaths } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import Link from 'next/link'
import type { FC } from 'react'

export const PostListHeadWidget: FC = () => {

    // 고정
    const { isAdminAuthed } = useAdminAuth()

    return (
        <section className='flex justify-between w-full mt-4'>
            <h2>PostListPage</h2>
            {isAdminAuthed && (
                <div className='flex gap-3'>
                    <Button asChild>
                        <Link href={routePaths.post.edit()}>Edit Post List</Link>
                    </Button>
                    <Button asChild>
                        <Link href={routePaths.post.create()}>Create Post</Link>
                    </Button>
                </div>
            )}
        </section>
    )
}
