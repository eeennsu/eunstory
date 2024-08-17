export const base64UrlDecode = (str: string): string => {
    try {
        return decodeURIComponent(
            atob(str)
                .split('')
                .map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join('')
        )
    } catch (error) {
        console.error('Error decoding base64Url string:', error)
        return ''
    }
}

export const parseJWT = (token: string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = base64UrlDecode(base64)
    const payload = JSON.parse(jsonPayload)

    return payload
}
