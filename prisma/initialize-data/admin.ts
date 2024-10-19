import { assertValue } from '@/lib/utils'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const createDefaultAdmin = async (prisma: PrismaClient) => {
    const adminId = assertValue(process.env.ADMIN_ID)
    const adminPassword = assertValue(process.env.ADMIN_PASSWORD)
    const adminName = assertValue(process.env.ADMIN_NAME)

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
                    name: adminName,
                    isAdmin: true,
                },
            })
        })
    }
}
