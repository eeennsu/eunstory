import { ResponseGetPostCommentListType } from '@/app/api/post/[id]/comment/route'
import { generateRequest } from '@/lib/fetch'

export const requestGetDetailPost = async ({ authorId, postId }: { authorId: string; postId: string }) => {
    return generateRequest<undefined, ResponseGetPostCommentListType>({
        url: `/api/post/${postId}/comment`,
    })
}
