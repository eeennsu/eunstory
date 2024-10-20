import { mainPath } from '@/lib/route'

export const NAV_LINKS = [
    {
        title: 'About',
        url: mainPath.about(),
    },
    {
        title: 'Posts',
        url: mainPath.post.list(),
    },
]
