import { assertValue } from '../utils'

const url = assertValue(process.env.NEXT_PUBLIC_API_URL)

export const getUrlFromServer = (path: string) => {
    console.log(`ttttttt => ${typeof window}}`)
    console.log(`zzzzzzz => ${url}${path}`)
    return `${url}${path}`
}
