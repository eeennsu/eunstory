FROM node:18-alpine

# 작업 디렉토리 생성 및 설정
RUN mkdir -p /usr/app
WORKDIR /usr/app

# 환경 변수 파일 복사
COPY .env /usr/app/.env

# 소스 코드 전체 복사
COPY ./ ./

# pnpm 설치 및 의존성 설치
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 프로젝트 빌드
RUN pnpm build

# 애플리케이션이 사용하는 포트 노출
EXPOSE 3000

# 애플리케이션 시작 명령어
CMD ["pnpm", "start"]