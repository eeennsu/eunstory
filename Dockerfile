# Node js 20 버전을 사용하여 빌드의 기초 이미지로 설정
FROM node:20 AS base

# app 디렉토리를 작업 디렉토리로 설정. 이 후 모든 명령어는 이 디렉토리에서 실행
WORKDIR /app

# pnpm 설치
RUN npm i -g pnpm

# 패키지 파일 복사 및 의존성 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 소스 코드 복사
COPY . .

# 빌드 과정에서 필요한 환경변수 설정
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# 애플리케이션 빌드
RUN pnpm build

# 빌드가 끝나면 node:20-alpine3.19 이미지를 사용하여 프로덕션 이미지를 생성. 이 이미지는 경량화된 운영 환경 제공
FROM node:20-alpine3.19 as release
WORKDIR /app

# 이전 base 스테이지에서 빌드된 파일들을 프로덕션 이미지로 복사
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next

# 이 애플리케이션이 3000번 포트에서 실행되도록 설정
EXPOSE 3000

# 컨테이너가 시작되면 애플리케이션을 실행
CMD ["pnpm", "start"]