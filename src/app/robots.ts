import { SITE_URL } from '@/shared/constants'
import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    }
}

export default robots
