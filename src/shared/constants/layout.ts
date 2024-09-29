import { mainPath } from '@/lib/route'

export const NAV_LINKS = [
    {
        title: 'Home',
        url: mainPath.home(),
    },
    {
        title: 'About me',
        url: mainPath.about(),
    },
    {
        title: 'Posts',
        url: mainPath.post.list(),
    },
]
