import { sanitize } from 'isomorphic-dompurify'
export const textSanitizing = (rawHTML: string): string => {
    return sanitize(rawHTML, { ADD_ATTR: ['target'] })
}
