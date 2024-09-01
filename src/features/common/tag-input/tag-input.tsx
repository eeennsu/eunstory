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
    setTagValues: (tags: string[]) => void
    isEmpty: () => boolean
}

export const TagInput = forwardRef<TagInputRef, Props>(({ className, placeholder, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [tags, setTags] = useState<string[]>([])

    const handleRegisterTag = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                const value = inputRef.current?.value

                if (tags.length === 5) {
                    toast({
                        title: '태그는 최대 5개까지 등록할 수 있습니다.',
                    })

                    if (inputRef.current) {
                        inputRef.current.value = ''
                    }
                    return
                }

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

                if (typeof value === 'string' && value.trim() !== '') {
                    setTags((prev) => [...prev, value.trim()])

                    if (inputRef.current) {
                        inputRef.current.value = ''
                    }
                }

                break
            case 'Backspace':
                if (tags.length === 0) return

                setTags((prev) => prev.slice(0, -1))

                break
        }
    }

    const handleRemoveTag = (tag: string) => {
        setTags((prev) => prev.filter((prevTag) => prevTag !== tag))

        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    useImperativeHandle(ref, () => ({
        getTags: () => tags,
        isEmpty: () => tags.length === 0,
        setTagValues: (tagValues: string[]) => setTags(tagValues),
    }))

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

TagInput.displayName = 'TagInput'
