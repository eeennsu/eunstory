import { RequestCreatePostCommentType, ResponseGetPostCommentListType } from '@/app/api/post/[id]/comment/route'
import { generateRequest } from '@/lib/fetch'

export const requestCreatePostComment = async ({
    postId,
    comment,
}: {
    postId: string
    comment: RequestCreatePostCommentType
}) => {
    return generateRequest<RequestCreatePostCommentType, ResponseGetPostCommentListType>({
        url: `/api/post/${postId}/comment`,
        method: 'POST',
        body: comment,
    })
}
