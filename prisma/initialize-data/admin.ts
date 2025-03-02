import { assertValue } from '@/lib/utils'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// deprecated: not using this function when initializing prisma
export const createDefaultAdmin = async (prisma: PrismaClient) => {
    const adminId = assertValue(process.env.ADMIN_ID)
    const adminPassword = assertValue(process.env.ADMIN_PASSWORD)
    const adminName = assertValue(process.env.ADMIN_NAME)

    try {
        const adminCount = await prisma.user.count()

        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10)

            await prisma.user.create({
                data: {
                    username: adminId,
                    password: hashedPassword,
                    name: adminName,
                    isAdmin: true,
                },
            })

            console.log('✅ Default admin created successfully')
        }
    } catch (error) {
        console.log('Failed to create default admin:', error)
        return false
    }
}
