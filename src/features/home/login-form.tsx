'use client'

import { FC, FormEvent, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { ERROR_CODES } from '@/lib/api'

export const LoginForm: FC = () => {
    const [id, setId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { status } = useSession()

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await signIn('credentials', {
            id,
            password,
            redirect: false,
        })

        if (response?.ok) {
            alert('login success')
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
        <div>
            {status === 'unauthenticated' && (
                <form onSubmit={onSubmit}>
                    <input
                        className='border border-black'
                        type='text'
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <input
                        className='border border-black'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>submit</button>
                </form>
            )}
        </div>
    )
}
