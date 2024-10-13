import type { FC } from 'react'

export const UploadingImage: FC = () => {
    return (
        <div className='absolute inset-0 w-full h-full flex justify-center items-center bg-slate-600/40 rounded-xl z-50'>
            <div className='flex flex-col items-center gap-3 p-6 bg-white rounded-lg shadow-lg animate-fade-in'>
                <p className='text-lg font-semibold text-gray-700'>Uploading your image...</p>
                <p className='text-sm text-gray-500'>Hang tight, this won&apos;t take long!</p>
                <div className='flex justify-center'>
                    <div className='w-8 h-8 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin' />
                </div>
            </div>
        </div>
    )
}
