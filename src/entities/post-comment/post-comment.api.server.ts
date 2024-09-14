import { generateRequest, getUrlFromServer } from '@/lib/fetch'

export const serverRequestGetCommentList = async ({ postId }: { postId: string }) => {
    return generateRequest({
        url: getUrlFromServer(`/api/post/${postId}/comment`),
    })
}
