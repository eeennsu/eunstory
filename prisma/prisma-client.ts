import { PrismaClient } from '@prisma/client'
import { createDefaultAdmin } from './initialize-data'

// 글로벌 객체에 Prisma Client 저장
declare global {
    var prismaGlobal: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
    // 프로덕션 환경에서는 인스턴스를 새로 생성
    prisma = new PrismaClient()
} else {
    // 개발 환경에서는 글로벌 객체에 저장하여 Prisma 인스턴스가 여러 번 생성되지 않도록 처리
    if (!global.prismaGlobal) {
        global.prismaGlobal = new PrismaClient()
    }
    prisma = global.prismaGlobal
}

// 초기 데이터 설정 함수는 별도로 호출
export const initializePrismaData = async () => {
    try {
        await createDefaultAdmin(prisma)
        console.log('🚀  Prisma is ready')
    } catch (error) {
        console.log('❌  Failed to initialize Prisma data')
        console.error(error)
    }
}

export default prisma