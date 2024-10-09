import { FloatingMenu } from '@/features/post/detail/post'
import { FC, PropsWithChildren } from 'react'

const DetailPostLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <FloatingMenu scrollThreshold={150} />
            {children}
        </>
    )
}

export default DetailPostLayout
