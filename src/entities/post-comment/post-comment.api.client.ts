import {
    RequestCreatePostCommentType,
    RequestDeletePostCommentType,
    ResponseGetPostCommentListType,
} from '@/app/api/post/[id]/comment/route'
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

export const requestDeletePostComment = async ({
    postId,
    id: commentId,
    userId,
}: RequestDeletePostCommentType & { postId: string }) => {
    return generateRequest<RequestDeletePostCommentType, {}>({
        url: `/api/post/${postId}/comment`,
        method: 'DELETE',
        body: {
            id: commentId,
            userId,
        },
    })
}
