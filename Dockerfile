# 1. 기본 노드 이미지를 설정합니다.
FROM node:18-alpine AS base

# 2. 필요한 종속성 설치 (라이브러리)
RUN apk add --no-cache libc6-compat

# 3. 작업 디렉토리를 설정합니다.
WORKDIR /app

# 4. 의존성 설치 단계
FROM base AS deps
# package manager 파일을 복사하고 pnpm을 사용하여 의존성을 설치합니다.
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# 5. 소스 코드 복사 및 빌드
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build

# 6. 실행을 위한 설정 (프로덕션 이미지)
FROM base AS runner
WORKDIR /app

# 환경변수를 설정합니다.
ENV NODE_ENV=production
ENV PORT=3000

# Vercel 배포에 필요한 파일들만 복사합니다.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Next.js 서버가 실행되도록 설정합니다.
EXPOSE 3000
CMD ["node", "server.js"]