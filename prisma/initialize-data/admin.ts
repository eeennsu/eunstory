import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

export const createDefaultAdmin = async (prisma: PrismaClient) => {
    const adminId = process.env.ADMIN_ID
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminId || !adminPassword) {
        throw new Error('ADMIN_ID and ADMIN_PASSWORD must be set in .env')
    }

    const adminCount = await prisma.admin.count()

    if (adminCount === 0) {
        bcrypt.hash(adminPassword, 10, async (err, hash) => {
            if (err) {
                throw new Error('Failed to hash password')
            }

            await prisma.admin.create({
                data: {
                    id: adminId,
                    password: hash,
                    name: 'Eunstory Admin',
                },
            })
        })
    }
}
