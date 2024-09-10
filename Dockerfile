# 1단계: 빌드 환경 설정
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json package-lock.json ./
RUN npm install

# 애플리케이션 소스 코드 복사
COPY . .

# Next.js 애플리케이션 빌드
RUN npm run build

# 2단계: 프로덕션 환경 설정
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 파일 복사
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 포트 노출
EXPOSE 3000

# Next.js 애플리케이션 시작
CMD ["npm", "start"]
