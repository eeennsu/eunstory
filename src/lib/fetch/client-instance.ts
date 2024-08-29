interface RequestProps {
    [key: string]: any
}

export interface Parameters<T> {
    url: string
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
    body?: T
    config?: RequestInit
}

export const generateRequest = async <TRequest extends RequestProps, TResponse>({
    method = 'GET',
    url,
    body,
    config,
}: Parameters<TRequest>) => {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(body && { body: JSON.stringify(body as TRequest) }),
        cache: 'no-store',
        ...config,
    })

    return response.json() as TResponse
}
