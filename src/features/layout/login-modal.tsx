'use client'

import { ERROR_CODES } from '@/lib/fetch'
import { useProgressBar } from '@/lib/hooks'
import { Button } from '@/lib/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/lib/ui/dialog'
import { Input } from '@/lib/ui/input'
import { Label } from '@/lib/ui/label'
import { useToast } from '@/lib/ui/use-toast'
import { Github, X } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Fragment, useState, type FC } from 'react'

export const LoginModal: FC = () => {
    const { executeWithProgress } = useProgressBar()
    const [id, setId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { status } = useSession()
    const { toast } = useToast()

    const isValidatedForm = () => {
        if (!id.length) {
            toast({
                title: 'ID를 입력해주세요.',
                position: 'top',
                variant: 'warning',
            })

            return false
        }

        if (!password.length) {
            toast({
                title: '비밀번호를 입력해주세요.',
                position: 'top',
                variant: 'warning',
            })

            return false
        }

        return true
    }

    const handleSignIn = () => {
        if (!isValidatedForm()) return

        executeWithProgress(async () => {
            if (!id.length || !password.length) {
                toast({
                    title: ERROR_CODES.MISSING_ID_OR_PASSWORD.title,
                    position: 'top',
                    variant: 'warning',
                })
            }

            try {
                const response = await signIn('credentials', {
                    id,
                    password,
                    redirect: false,
                })

                if (response?.ok && response?.status === 200) {
                    toast({
                        title: '로그인에 성공했습니다.',
                        position: 'bottom',
                    })
                } else {
                    switch (response?.error) {
                        case ERROR_CODES.MISSING_ID_OR_PASSWORD.code:
                            toast({
                                title: ERROR_CODES.MISSING_ID_OR_PASSWORD.title,
                                position: 'top',
                                variant: 'warning',
                            })

                            return

                        case ERROR_CODES.USER_NOT_FOUND.code:
                            toast({
                                title: ERROR_CODES.USER_NOT_FOUND.title,
                                description: ERROR_CODES.USER_NOT_FOUND.description,
                                position: 'top',
                                variant: 'warning',
                            })

                            return

                        case ERROR_CODES.INCORRECT_ID_OR_PASSWORD.code:
                            toast({
                                title: ERROR_CODES.INCORRECT_ID_OR_PASSWORD.title,
                                description: ERROR_CODES.INCORRECT_ID_OR_PASSWORD.description,
                                position: 'top',
                                variant: 'warning',
                            })

                            return
                    }
                }
            } catch (error) {
                console.error(error)
            }
        })
    }

    const handleGithubSignIn = () => {
        executeWithProgress(async () => {
            try {
                const response = await signIn('github', {
                    redirect: false,
                })

                console.log('zzzzz', response)

                if (response?.ok && response?.status === 200) {
                    toast({
                        title: '로그인에 성공했습니다.',
                        position: 'bottom',
                    })
                }
            } catch (error) {
                console.error(error)
            }
        })
    }

    return (
        <Dialog modal>
            <DialogTrigger
                asChild
                className='cursor-default'>
                <Button variant='secondary'>Login</Button>
            </DialogTrigger>
            <DialogContent
                className='sm:max-w-[425px]'
                isCloseHidden>
                <DialogHeader>
                    <div className='flex justify-between items-center'>
                        <DialogTitle>Hello Eunsu!</DialogTitle>
                        <DialogClose asChild>
                            <Button
                                variant='ghost'
                                className='p-3'>
                                <X className='size-4' />
                            </Button>
                        </DialogClose>
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
                        <DialogFooter className='flex flex-col gap-2'>
                            <Button
                                className='w-full'
                                type='button'
                                onClick={handleSignIn}>
                                Sign In
                            </Button>
                            <Button
                                className='w-full !ml-0 gap-3 bg-[#24292E]'
                                onClick={handleGithubSignIn}>
                                <Github size={20} />
                                Sign in with Git Hub
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
