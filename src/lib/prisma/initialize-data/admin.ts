import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const createDefaultAdmin = async (prisma: PrismaClient) => {
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