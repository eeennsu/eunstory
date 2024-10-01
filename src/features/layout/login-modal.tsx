'use client'

import { useLoginModalStore } from '@/entities/user'
import { callToast, ERROR_CODES } from '@/lib/fetch'
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
import { Separator } from '@/lib/ui/separator'
import { Google } from '@/shared/icons/google'
import { Github, X } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { PropsWithChildren, useState, type FC } from 'react'

export const LoginModal: FC<PropsWithChildren> = ({ children }) => {
    const [isOpen, setIsOpen] = useLoginModalStore((state) => [state.isOpen, state.setIsOpen])
    const { executeWithProgress, barRouter } = useProgressBar()
    const [id, setId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { status } = useSession()

    const isValidatedForm = () => {
        if (!id.length) {
            callToast({
                title: 'ID를 입력해주세요.',
                position: 'top',
                variant: 'warning',
            })

            return false
        }

        if (!password.length) {
            callToast({
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
                callToast({
                    title: ERROR_CODES.MISSING_ID_OR_PASSWORD.title,
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
                    callToast({
                        title: '로그인에 성공했습니다.',
                        position: 'bottom',
                    })

                    barRouter.refresh()
                } else {
                    switch (response?.error) {
                        case ERROR_CODES.MISSING_ID_OR_PASSWORD.code:
                            callToast({
                                type: 'MISSING_ID_OR_PASSWORD',
                                variant: 'warning',
                            })

                            return

                        case ERROR_CODES.USER_NOT_FOUND.code:
                            callToast({
                                type: 'USER_NOT_FOUND',
                                variant: 'warning',
                            })

                            return

                        case ERROR_CODES.INCORRECT_ID_OR_PASSWORD.code:
                            callToast({
                                type: 'INCORRECT_ID_OR_PASSWORD',
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

                if (response?.ok && response?.status === 200) {
                    callToast({
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
        <Dialog
            modal
            open={isOpen}
            onOpenChange={(trigger) => setIsOpen(trigger)}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className='sm:max-w-[425px] bg-gray-800 text-gray-100 border border-gray-700'
                isCloseHidden
                overlayClassName='bg-black/90'>
                <DialogHeader>
                    <div className='flex justify-between items-center'>
                        <DialogTitle>Sign in</DialogTitle>
                        <DialogClose asChild>
                            <Button
                                variant='ghost'
                                className='p-3 hover:bg-gray-700'>
                                <X className='size-4' />
                            </Button>
                        </DialogClose>
                    </div>
                </DialogHeader>
                {status === 'unauthenticated' ? (
                    <section className='flex flex-col gap-7'>
                        <div className='grid gap-4'>
                            <div className='grid gap-2'>
                                <Label
                                    htmlFor='id'
                                    className='text-gray-300'>
                                    ID
                                </Label>
                                <Input
                                    id='id'
                                    className='col-span-3 border-gray-600 text-gray-200 focus:ring-gray-600 bg-gray-700'
                                    variant='clear'
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <Label
                                    htmlFor='password'
                                    className='text-gray-300'>
                                    Password
                                </Label>
                                <Input
                                    id='password'
                                    className='col-span-3 border-gray-600 text-gray-200 focus:ring-gray-600 bg-gray-700'
                                    type='password'
                                    variant='clear'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter className='flex flex-col gap-2'>
                            <Button
                                variant='outline'
                                className='w-full bg-blue-600 text-white hover:bg-blue-700 border-none'
                                type='button'
                                onClick={handleSignIn}>
                                Sign In
                            </Button>
                            <Separator className='bg-gray-700 my-3' />
                            <Button
                                className='w-full'
                                variant='signature'
                                onClick={handleGithubSignIn}>
                                <Github className='mr-2 h-4 w-4' />
                                Sign in with Git Hub
                            </Button>
                            <Button
                                className='w-full'
                                variant='signature'>
                                <Google />
                                Sign in with Google
                            </Button>
                        </DialogFooter>
                    </section>
                ) : (
                    status === 'authenticated' && <Button onClick={() => signOut()}>Logout</Button>
                )}
            </DialogContent>
        </Dialog>
    )
}
