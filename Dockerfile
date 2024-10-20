# 컨테이너에 사용할 기본 이미지를 지정, Linux 위에 구축된 node 18
FROM node:18-alpine

# pnpm 설치
RUN npm install -g pnpm

# 작업 디렉토리를 지정
WORKDIR /app

# package.json의 파일을 /app 컨테이너 내부 디렉터리로 복사한다.
COPY package.json ./

# 의존성 설치
RUN pnpm install

# 어플리케이션의 전체 내용을 컨테이너 내부 디렉토리로 복사한다.
COPY . .

# nextjs 앱을 빌드한다.
RUN pnpm build

# 컨테이너의 포트를 3000으로 지정한다.
EXPOSE 3000

# 컨테이너가 시작될 때 실행할 명령
CMD ["pnpm", "run", "dev"]