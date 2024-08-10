'use client'
import { FC, FormEvent, useState } from 'react'

import { signIn, signOut, useSession } from 'next-auth/react'
const HomePage: FC = () => {
    const [id, setId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { status } = useSession()

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await signIn('credentials', {
            id,
            password,
            redirect: false,
        })
    }

    return (
        <main>
            {status === 'authenticated' ? (
                <div>
                    <p>'hello world!'</p>
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
        </main>
    )
}

export default HomePage
