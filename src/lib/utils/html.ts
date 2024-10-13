import { sanitize } from '@jill64/universal-sanitizer'
export const textSanitizing = (rawHTML: string): string => {
    return sanitize(rawHTML, {
        sanitizeHtml: {
            allowedAttributes: {
                target: ['_blank'],
            },
        },
    })
}

export const getProcessedText = (html: string): string => {
    // 1. <p> 태그나 <br> 태그를 처리하여 한 줄 띄움으로 변환
    const processedText = html
        .replace(/<\/?(p|h[1-6])(\s[^>]*)?>/g, '') // p, h1-h6 태그 제거 (속성 포함)
        .replace(/<br\s*\/?>/g, '\n') // <br> 태그를 줄바꿈으로 변환
        .replace(/<\/?li(\s[^>]*)?>/g, '\n') // li 태그는 줄바꿈으로 변환 (속성 포함)
        .replace(/<\/?(ul|ol)(\s[^>]*)?>/g, '') // ul, ol 태그 제거 (속성 포함)
        .replace(/<\/?(em|strong|s)(\s[^>]*)?>/g, '') // em, strong, s 태그 제거 (인라인 태그)
        .replace(/<img[^>]*>/g, '') // img 태그는 완전히 제거
        .replace(/<\/?(pre|code)(\s[^>]*)?>/g, '\n') // pre, code 태그는 줄바꿈으로 변환
        .replace(/\n+/g, ' ') // 줄바꿈이 여러 번 발생한 부분을 공백 하나로 변환

    return processedText.trim() // 맨 앞뒤의 불필요한 공백 제거
}
