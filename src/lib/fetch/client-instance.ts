export interface Parameters<T> {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: T
    config?: RequestInit
}

export const generateRequest = async <T>({ method = 'GET', url, body, config }: Parameters<T>) => {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(body && { body: JSON.stringify(body) }),
        cache: 'no-store',
        ...config,
    })

    return response.json()
}
