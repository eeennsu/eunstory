FROM node:20 AS base
WORKDIR /app
RUN npm i -g pnpm

# 패키지 파일 복사 및 의존성 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 소스 코드 복사
COPY . .

# 빌드에 필요한 환경변수를 설정
ARG DATABASE_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
ENV GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}

# 애플리케이션 빌드
RUN pnpm build

# 최종 프로덕션 이미지 생성
FROM node:20-alpine3.19 as release
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next

EXPOSE 3000

CMD ["pnpm", "start"]