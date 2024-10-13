import { Nanum_Gothic, Poor_Story } from 'next/font/google'

export const nanumGothic = Nanum_Gothic({
    weight: ['400', '700', '800'],
    fallback: ['Arial', 'Helvetica', 'sans-serif'],
    subsets: ['latin'],
})

export const poorStory = Poor_Story({
    weight: '400',
    fallback: ['Arial', 'Helvetica', 'sans-serif'],
    subsets: ['latin'],
})
