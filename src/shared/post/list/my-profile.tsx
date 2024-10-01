import type { FC } from 'react'

export const MyProfile: FC = () => {
    return (
        <figure className='flex flex-col items-center text-center'>
            <div className='size-24 bg-gray-700 rounded-full flex items-center justify-center'>
                <span className='text-lg font-bold text-gray-400'>내 사진</span>
            </div>
            <h2 className='text-xl font-semibold text-white mt-4 leading-relaxed'>
                프론트엔드 개발자 <br /> 방은수의 기록들
            </h2>
        </figure>
    )
}
