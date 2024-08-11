import { routePaths } from '@/lib/route'

export const NAV_LINKS = [
    {
        title: 'Home',
        url: routePaths.home(),
    },
    {
        title: 'About me',
        url: routePaths.about(),
    },
    {
        title: 'Posts',
        url: routePaths.post.list(),
    },
]
