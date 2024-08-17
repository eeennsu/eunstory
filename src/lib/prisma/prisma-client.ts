import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prismaClientSingleton = () => {
    const prisma = new PrismaClient()

    const createDefaultAdmin = async () => {
        const adminId = process.env.ADMIN_ID
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminId || !adminPassword) {
            throw new Error('ADMIN_ID and ADMIN_PASSWORD must be set in .env')
        }

        const adminCount = await prisma.user.count()

        if (adminCount === 0) {
            bcrypt.hash(adminPassword, 10, async (err, hash) => {
                if (err) {
                    throw new Error('Failed to hash password')
                }

                await prisma.user.create({
                    data: {
                        username: adminId,
                        password: hash,
                        name: 'Eunstory Admin',
                        isAdmin: true,
                    },
                })
            })
        }
    }

    const setInitializeData = async () => {
        await createDefaultAdmin()
        return true
    }

    setInitializeData()
        .then(() => {
            // eslint-disable-next-line no-console
            console.log('🚀  Prisma is ready')
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('❌  Failed to ready about prisma')
            // eslint-disable-next-line no-console
            console.log(error)
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
