'use client'

import { useProgressBar } from '@/lib/hooks'
import { mainPath } from '@/lib/route'
import { Input } from '@/lib/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, type FC } from 'react'

export const PostSearch: FC = () => {
    const router = useRouter()
    const [searchKeyword, setSearchKeyword] = useState<string>('')
    const { executeWithProgress } = useProgressBar()

    const handleSearch = () => {
        if (!searchKeyword) return

        alert('공사 중..')
        // executeWithProgress(() => {
        //     router.push(mainPath.post.list(searchKeyword))
        // })
    }

    return (
        <div className='relative'>
            <Input
                type='text'
                placeholder='제목 또는 테그로 검색'
                variant='clear'
                className='flex-1 p-3 rounded-l-md bg-gray-800 pr-0 text-white placeholder:text-gray-600 h-10'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
                className='absolute right-3 top-3 text-gray-400 hover:text-white'
                onClick={handleSearch}>
                <Search size={18} />
            </button>
        </div>
    )
}
