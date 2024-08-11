import { setFetchLoading } from '@/entities/fetch-loading'
import axios from 'axios'

export const client = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: process.env.NODE_ENV === 'production' ? 5000 : 30000,
    headers: {
        'Content-Type': 'application/json',
    },
})

client.interceptors.request.use(
    (config) => {
        setFetchLoading(true)

        return config
    },
    (err) => {
        setFetchLoading(false)

        return Promise.reject(err)
    }
)

client.interceptors.response.use(
    (config) => {
        setFetchLoading(false)

        return config
    },
    (err) => {
        setFetchLoading(false)

        return Promise.reject(err)
    }
)
