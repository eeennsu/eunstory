'use client'

import { FC } from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export const TopLoadingBar: FC = () => {
    return (
        <ProgressBar
            height='4px'
            color='#4790da'
            options={{ showSpinner: false, trickleSpeed: 700, easing: 'ease-out' }}
            shallowRouting
        />
    )
}
