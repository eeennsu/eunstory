const url = process.env.NEXT_PUBLIC_API_URL

export const getUrlFromServer = (path: string) => {
    return `${url}${path}`
}
