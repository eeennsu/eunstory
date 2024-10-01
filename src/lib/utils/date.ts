import dayjs from 'dayjs'
import 'dayjs/locale/ko'
dayjs.locale('ko')

export const formatBeforeTime = (dateString: string | Date): string => {
    const start = dayjs(dateString)
    const end = dayjs()

    const diffInSeconds = end.diff(start, 'second')
    const diffInMinutes = end.diff(start, 'minute')
    const diffInHours = end.diff(start, 'hour')
    const diffInDays = end.diff(start, 'day')
    const diffInWeeks = end.diff(start, 'week')
    const diffInMonths = end.diff(start, 'month')
    const diffInYears = end.diff(start, 'year')

    if (diffInSeconds < 60) {
        return '방금 전'
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`
    } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`
    } else if (diffInDays < 7) {
        return `${diffInDays}일 전`
    } else if (diffInWeeks < 4) {
        return `${diffInWeeks}주 전`
    } else if (diffInMonths < 12) {
        return `${diffInMonths}달 전`
    } else {
        return `${diffInYears}년 전`
    }
}

export const formatDateToYMD = (date: Date | string) => {
    return dayjs(date).format('YYYY.MM.DD')
}

export const formatDateToFull = (date: Date | string) => {
    return dayjs(date).format('YYYY년 M월 D일 a h시 m분')
}
