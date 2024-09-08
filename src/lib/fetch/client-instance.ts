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
    const requestOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...config,
    }

    if (body && typeof body !== 'undefined') {
        requestOptions.body = JSON.stringify(body)
    }

    const response = await fetch(url, requestOptions)

    if (response.status === 204) {
        return null as TResponse
    }

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return response.json() as TResponse
}