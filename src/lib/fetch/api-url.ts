import { assertValue } from '../utils'

const url = assertValue(process.env.VERCEL_ENV === 'preview' ? process.env.NEXT_PUBLIC_API_URL : process.env.API_URL)

export const getUrlFromServer = (path: string) => {
    return `${url}${path}`
}
