'use client'

import { callToast } from '@/lib/fetch'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { Badge } from '@/lib/ui/badge'
import { Input } from '@/lib/ui/input'
import { toast } from '@/lib/ui/use-toast'
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

    const handleTagLimit = () => {
        if (tags.length === 5) {
            callToast({
                title: '태그는 최대 5개까지 등록할 수 있습니다.',
            })
            if (inputRef.current) {
                inputRef.current.value = ''

                return true
            }
        }

        return false
    }

    const handleRegisterTag = (e: KeyboardEvent<HTMLInputElement>) => {
        const value = inputRef.current?.value

        switch (e.key) {
            case ',':
                if (handleTagLimit()) {
                    return
                }

                if (typeof value === 'string' && value.trim() !== '') {
                    setTags((prev) => [...prev, value.trim().slice(0, -1)])

                    if (inputRef.current) {
                        inputRef.current.value = ''
                    }
                }

                break
            case 'Enter':
                if (handleTagLimit()) {
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
        <section className='flex rounded-lg items-center bg-gray-800 focus-within:ring-2 focus-within:ring-slate-400'>
            {!!tags.length && (
                <ul className='flex gap-2 bg-gray-800 rounded-l-lg border-l border-y pl-3 py-3 border-slate-700 focus:border-slate-400'>
                    {tags.map((tag) => (
                        <Badge
                            key={uuid()}
                            variant={'outline'}
                            className='cursor-pointer'
                            onClick={() => handleRemoveTag(tag)}>
                            {tag}
                        </Badge>
                    ))}
                </ul>
            )}

            <Input
                ref={inputRef}
                variant={'secondary'}
                type='text'
                onKeyUp={handleRegisterTag}
                placeholder={placeholder}
                className={cn(!!tags.length && 'border-l-0 !rounded-l-none', className)}
                {...props}
            />
        </section>
    )
})

TagInput.displayName = 'TagInput'
