export type ExtractSafety<T, K extends keyof T> = T extends Record<K, any> ? T[K] : never

// TODO: 좀 더 연구 필요
// type ExtractErrorFree<T> = T extends { error?: unknown } ? never : T

// export const extractSafetyData = <T extends { error?: unknown }>(
//     response: T | { error: unknown }
// ): ExtractErrorFree<T> | null => {
//     return 'error' in response ? null : (response as ExtractErrorFree<T>)
// }
