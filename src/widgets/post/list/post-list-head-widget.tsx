import { mainPath } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import Link from 'next/link'
import type { FC } from 'react'

export const PostListHeadWidget: FC = () => {
    return (
        <section className='fixed flex p-3 rounded-sm flex-col gap-3 top-28 right-0'>
            <Button
                asChild
                variant={'signature'}>
                <Link href={mainPath.post.create()}>포스트 생성</Link>
            </Button>
            <Button
                asChild
                variant={'signature'}>
                <Link href={mainPath.post.temporaryList()}>임시 저장 목록</Link>
            </Button>
            <Button
                asChild
                variant={'signature'}>
                <Link href={mainPath.post.edit()}>포스트 순서 수정</Link>
            </Button>
        </section>
    )
}
