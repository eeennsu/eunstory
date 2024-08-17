'use client'

import { FC } from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export const TopLoadingBar: FC = () => {
    return (
        <ProgressBar
            height='6px'
            color='#298fc9'
            options={{ showSpinner: false, trickleSpeed: 700, easing: 'ease-out' }}
            shallowRouting
        />
    )
}
