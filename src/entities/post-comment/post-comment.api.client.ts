import {
    RequestCreatePostCommentType,
    RequestDeletePostCommentType,
    RequestEditPostCommentType,
    ResponseEditPostCommentType,
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

export const requestEditPostComment = async ({
    postId,
    content,
    id: commentId,
    userId,
}: RequestEditPostCommentType & { postId: string }) => {
    return generateRequest<RequestEditPostCommentType, ResponseEditPostCommentType>({
        url: `/api/post/${postId}/comment`,
        method: 'PATCH',
        body: {
            id: commentId,
            content,
            userId,
        },
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
