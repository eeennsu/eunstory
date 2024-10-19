import { PrismaClient } from '@prisma/client'
import { createDefaultAdmin } from './initialize-data'

function prismaClientSingleton() {
    const prisma = new PrismaClient()

    const setInitializeData = async () => {
        try {
            await createDefaultAdmin(prisma)
            console.log('✅ Prisma initialized successfully with default admin')
        } catch (error) {
            console.error('❌ Prisma initialization failed:', error)
        }
    }

    setInitializeData().then(() => {
        console.log('🚀 Prisma is ready')
    })

    return prisma
}

declare const globalThis: {
    prismaGlobal: PrismaClient
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma
}
