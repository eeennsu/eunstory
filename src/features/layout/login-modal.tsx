'use client'

import { ERROR_CODES } from '@/lib/fetch'
import { Button } from '@/lib/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/lib/ui/dialog'
import { Input } from '@/lib/ui/input'
import { Label } from '@/lib/ui/label'
import { useToast } from '@/lib/ui/use-toast'
import { X } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Fragment, PropsWithChildren, useState, type FC } from 'react'

interface Props {
    isTriggered: boolean
    close: () => void
}

export const LoginModal: FC<PropsWithChildren<Props>> = ({ children, isTriggered, close }) => {
    const [id, setId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { status } = useSession()
    const { toast } = useToast()

    const onSubmit = async () => {
        if (!id.length || !password.length) {
            return toast({
                title: '아이디 또는 비밀번호를 입력해주세요',
                position: 'top',
                variant: 'warning',
            })
        }

        const response = await signIn('credentials', {
            id,
            password,
            redirect: false,
        })

        if (response?.ok && response.status === 200) {
            close()
        } else {
            switch (response?.error) {
                case ERROR_CODES.MISSING_ID_OR_PASSWORD:
                    return toast({
                        title: '아이디 또는 비밀번호를 입력해주세요',
                        position: 'top',
                        variant: 'warning',
                    })

                case ERROR_CODES.USER_NOT_FOUND:
                    return toast({
                        title: '유저를 찾을 수 없습니다.',
                        description: '다시 입력해주세요.',
                        position: 'top',
                        variant: 'warning',
                    })

                case ERROR_CODES.INCORRECT_ID_OR_PASSWORD:
                    return toast({
                        title: '아이디 또는 비밀번호가 일치하지 않습니다.',
                        description: '다시 입력해주세요.',
                        position: 'top',
                        variant: 'warning',
                    })
            }
        }
    }

    return (
        <Dialog
            open={isTriggered}
            modal>
            <DialogTrigger className='cursor-default'>{children}</DialogTrigger>
            <DialogContent
                className='sm:max-w-[425px]'
                onInteractOutside={close}
                isCloseHidden>
                <DialogHeader>
                    <div className='flex justify-between items-center'>
                        <DialogTitle>Hello Eunsu!</DialogTitle>
                        <Button
                            variant='ghost'
                            className='p-3'
                            onClick={close}>
                            <X className='size-4' />
                        </Button>
                    </div>
                </DialogHeader>
                {status === 'unauthenticated' ? (
                    <Fragment>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label
                                    htmlFor='id'
                                    className='text-right'>
                                    ID
                                </Label>
                                <Input
                                    id='id'
                                    className='col-span-3'
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label
                                    htmlFor='password'
                                    className='text-right'>
                                    Password
                                </Label>
                                <Input
                                    id='password'
                                    className='col-span-3'
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type='submit'
                                onClick={onSubmit}>
                                Login
                            </Button>
                        </DialogFooter>
                    </Fragment>
                ) : (
                    status === 'authenticated' && <Button onClick={() => signOut()}>Logout</Button>
                )}
            </DialogContent>
        </Dialog>
    )
}
