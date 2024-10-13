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

    if (body && typeof body !== 'undefined') {
        requestOption.body = JSON.stringify(body)
    }

    const response = await fetch(url, requestOption)

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    if (response.status === 204) {
        return null as TResponse
    }

    return response.json() as TResponse
}
