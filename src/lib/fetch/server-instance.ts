// 'use server'

// import { headers } from 'next/headers'
// import { generateRequest, Parameters, RequestProps } from './client-instance'

// export const serverRequest = async <TRequest extends RequestProps | undefined, TResponse>({
//     method = 'GET',
//     url,
//     body,
//     config,
// }: Parameters<TRequest>) => {
//     return generateRequest<TRequest, TResponse>({
//         method,
//         url,
//         ...(body && { body }),
//         config: { headers: headers(), ...config },
//     })
// }
