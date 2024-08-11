import { PrismaClient } from '@prisma/client'
import { createDefaultAdmin } from '@/lib/prisma/initialize-data'

const prismaClientSingleton = () => {
    const prisma = new PrismaClient()

    const setInitializeData = async () => {
        await createDefaultAdmin(prisma)
        return true
    }

    setInitializeData()
        .then(() => {
            // eslint-disable-next-line no-console
            console.log('🚀 Prisma is ready')
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('❌  Failed to ready about prisma')
            // eslint-disable-next-line no-console
            console.log(error)
            process.exit(1)
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
