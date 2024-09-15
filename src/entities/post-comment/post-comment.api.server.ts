import { ResponseGetPostCommentListType } from '@/app/api/post/[id]/comment/route'
import { generateRequest, getUrlFromServer } from '@/lib/fetch'

export const serverRequestGetCommentList = async ({ postId }: { postId: string }) => {
    return generateRequest<undefined, ResponseGetPostCommentListType>({
        url: getUrlFromServer(`/api/post/${postId}/comment`),
    })
}
