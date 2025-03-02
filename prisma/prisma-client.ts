import { PrismaClient } from '@prisma/client'
import { createDefaultAdmin } from './initialize-data'

declare const globalThis: {
    prismaGlobal: PrismaClient
} & typeof global

const prisma = globalThis.prismaGlobal ?? new PrismaClient()

export default prisma

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma
}
