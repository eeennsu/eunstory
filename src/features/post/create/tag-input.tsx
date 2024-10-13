'use client'

import { useToast } from '@/lib/hooks'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { Badge } from '@/lib/ui/badge'
import { Input } from '@/lib/ui/input'
import { CustomTooltip } from '@/shared/common'
import {
    FC,
    forwardRef,
    InputHTMLAttributes,
    KeyboardEvent,
    PropsWithChildren,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'
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

    const { toast } = useToast()

    const handleTagLimit = () => {
        if (tags.length === 5) {
            toast({
                title: '태그는 최대 5개까지 등록할 수 있습니다.',
                type: 'warning',
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
                        type: 'warning',
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
                if (value === '' && tags.length) {
                    setTags((prev) => prev.slice(0, -1))
                }

                break

            default:
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
        <CustomTooltip content='쉼표 혹은 엔터를 입력하면 태그가 등록됩니다. 클릭하면 삭제됩니다.'>
            <section className='flex rounded-lg items-center bg-gray-800 '>
                {!!tags.length && (
                    <ul className='flex gap-2 bg-gray-800 rounded-l-lg border-l border-y pl-3 py-3 border-slate-700 '>
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
        </CustomTooltip>
    )
})

TagInput.displayName = 'TagInput'
