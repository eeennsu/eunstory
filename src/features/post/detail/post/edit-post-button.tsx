'use client'

import { useProgressBar } from '@/lib/hooks'
import { mainPath } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import { Pencil } from 'lucide-react'
import type { FC } from 'react'

interface Props {
    id: string
}

export const EditPostButton: FC<Props> = ({ id }) => {
    const { barRouter } = useProgressBar()

    const handleEditLink = () => {
        barRouter.replace(mainPath.post.edit(id))
    }

    return (
        <Button
            type='button'
            size={'icon-xs'}
            variant={'signature'}
            onClick={handleEditLink}>
            <Pencil size={18} />
        </Button>
    )
}
