# --- Giai đoạn 1: BUILDER ---
# Sử dụng một image Node.js đầy đủ để build ứng dụng
FROM node:20.9-alpine AS builder

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json để tận dụng Docker cache
COPY package*.json ./

# Cài đặt tất cả dependencies, bao gồm cả devDependencies để build
RUN npm install

# Sao chép toàn bộ mã nguồn còn lại
COPY . .

# Chạy prisma generate để tạo Prisma Client
RUN npx prisma generate

# Biên dịch code TypeScript sang JavaScript
RUN npm run build

# --- Giai đoạn 2: PRODUCTION ---
FROM node:20.9-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma

COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

EXPOSE 8000
CMD ["./docker-entrypoint.sh"]