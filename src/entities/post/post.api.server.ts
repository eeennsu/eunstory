'use server'

import { getUrlFromServer, serverRequest } from '@/lib/fetch'

export const requestGetDefaultPostList = async () => {
    return serverRequest({
        url: getUrlFromServer('/post/?curPage=1&perPage=5'),
    })
}
