import { assertValue } from '../utils'

export type RequestProps = {
    [key: string]: any
}

export type Parameters<T> = {
    url: string
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
    body?: T
    config?: RequestInit
}

export const generateRequest = async <TRequest extends RequestProps | undefined, TResponse>({
    method = 'GET',
    url,
    body,
    config,
}: Parameters<TRequest>) => {
    const requestOption: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...config,
    }

    if (!!body) {
        requestOption.body = JSON.stringify(body)
    }

    const apiUrl =
        typeof window === 'undefined' ? `${assertValue(process.env.NEXT_PUBLIC_API_URL)}/api${url}` : `/api${url}`

    const response = await fetch(apiUrl, requestOption)

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    if (response.status === 204) {
        return null as TResponse
    }

    return response.json() as TResponse
}
