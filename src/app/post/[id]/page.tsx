import type { FC } from 'react'

type Props = {
    params: {
        id: string
    }
}

const DetailPostPage: FC<Props> = ({ params: { id } }) => {
    return <div>DetailPostPage - {id}</div>
}

export default DetailPostPage
