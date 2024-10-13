import { assertValue } from '../utils'

const url = assertValue(process.env.VERCEL_ENV === 'production' ? process.env.API_URL : process.env.NEXT_PUBLIC_API_URL)

export const getUrlFromServer = (path: string) => {
    return `${url}${path}`
}
