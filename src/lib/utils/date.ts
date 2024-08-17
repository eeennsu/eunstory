import dayjs from 'dayjs'

export const getDateWithTime = (date: Date) => {
    return dayjs(date).format('YY-MM-DD / HH:mm')
}
