'use client'

import { cn } from '@/lib/shadcn/shadcn-utils'
import { Badge } from '@/lib/ui/badge'
import { toast } from '@/lib/ui/use-toast'
import { Input } from '@/shared/common'
import { forwardRef, InputHTMLAttributes, KeyboardEvent, useImperativeHandle, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export interface TagInputRef {
    getTags: () => string[]
    isEmpty: () => boolean
}

export const TagInput = forwardRef<TagInputRef, Props>(({ className, placeholder, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [tags, setTags] = useState<string[]>([])

    useImperativeHandle(ref, () => ({
        getTags: () => tags,
        isEmpty: () => tags.length === 0,
    }))

    const handleRegisterTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return
        const value = inputRef.current?.value

        if (value?.includes(';')) {
            toast({
                title: '태그에는 세미콜론을 사용할 수 없습니다.',
            })
            return
        }

        if (tags.find((tag) => tag === value) && inputRef.current) {
            inputRef.current.value = ''

            toast({
                title: '같은 태그는 등록할 수 없습니다.',
            })
            return
        }

        if (tags.length >= 5) {
            toast({
                title: '태그는 최대 5개까지 등록할 수 있습니다.',
            })

            if (inputRef.current) {
                inputRef.current.value = ''
            }
            return
        }

        if (typeof value === 'string' && value.trim() !== '') {
            setTags((prev) => [...prev, value])

            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }

    const handleRemoveTag = (tag: string) => {
        setTags((prev) => prev.filter((prevTag) => prevTag !== tag))
    }

    return (
        <section className='flex bg-white rounded-lg items-center'>
            {tags.length > 0 && (
                <ul className='flex gap-1 bg-white rounded-l-md py-1 pl-2 h-10'>
                    {tags.map((tag) => (
                        <Badge
                            key={uuid()}
                            className='cursor-pointer'
                            onClick={() => handleRemoveTag(tag)}>
                            {tag}
                        </Badge>
                    ))}
                </ul>
            )}

            <Input
                ref={inputRef}
                type='text'
                onKeyUp={handleRegisterTag}
                placeholder={placeholder}
                className={cn('flex-1', className)}
                {...props}
            />
        </section>
    )
})
