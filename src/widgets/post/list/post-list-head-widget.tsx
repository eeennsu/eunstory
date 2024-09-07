import { getServerAdminAuth } from '@/lib/auth'
import { routePaths } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import Link from 'next/link'
import type { FC } from 'react'

export const PostListHeadWidget: FC = async () => {
    const { isAdminAuthed } = await getServerAdminAuth()

    return (
        <section className='flex justify-between w-full'>
            <h2>PostListPage</h2>
            {isAdminAuthed && (
                <Button asChild>
                    <Link href={routePaths.post.create()}>Create</Link>
                </Button>
            )}
        </section>
    )
}
