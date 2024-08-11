'use client'
import { FC, FormEvent, useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { ERROR_CODES } from '@/lib/api'
import { client } from '@/lib/axios/client-instance'
import Link from 'next/link'

const HomePage: FC = () => {
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

    useEffect(() => {
        client.get('/api/post').then((res) => console.log(res))
    }, [])

    return (
        <main>
            {status === 'authenticated' ? (
                <div>
                    <p>hello world!</p>
                    <button onClick={() => signOut()}>Logout</button>
                </div>
            ) : (
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
            <Link href={'/post'}>Go to post</Link>
        </main>
    )
}

export default HomePage
