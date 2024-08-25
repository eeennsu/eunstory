'use server'

import { headers } from 'next/headers'
import { generateRequest, Parameters } from './client-instance'

export const serverRequest = async <T>({ method = 'GET', url, body, config }: Parameters<T>) => {
    return generateRequest({ method, url, body, config: { headers: headers(), ...config } })
}
