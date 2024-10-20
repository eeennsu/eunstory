FROM node:20 AS base
WORKDIR /app
RUN npm i -g pnpm

# 패키지 파일 복사 및 의존성 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 소스 코드 복사 및 빌드
COPY . .
# Prisma가 DATABASE_URL을 필요로 하므로 이를 build 명령에 전달
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN pnpm build

# 최종 프로덕션 이미지 생성
FROM node:20-alpine3.19 as release
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next

EXPOSE 3000

CMD ["pnpm", "start"]