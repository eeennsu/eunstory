'use client'

import { ERROR_CODES } from '@/lib/fetch'
import { Button } from '@/lib/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/lib/ui/dialog'
import { Input } from '@/lib/ui/input'
import { Label } from '@/lib/ui/label'
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

    const onSubmit = async () => {
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
                    return alert('ID or Password is missing')

                case ERROR_CODES.USER_NOT_FOUND:
                    return alert('User not found')

                case ERROR_CODES.INCORRECT_PASSWORD:
                    return alert('Incorrect password')
            }
        }
    }

    return (
        <Dialog
            open={isTriggered}
            modal>
            <DialogTrigger className='cursor-default'>{children}</DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <div className='flex justify-between items-center'>
                        <DialogTitle>Hello Eunsu!</DialogTitle>
                        <Button
                            className='px-3 h-8'
                            variant='ghost'
                            onClick={close}>
                            X
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
