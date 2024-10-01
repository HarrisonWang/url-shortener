# 构建阶段
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装所有依赖
RUN npm ci

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 生产阶段
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装生产依赖
RUN npm ci --only=production

# 复制构建产物和公共文件
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 创建启动脚本
RUN echo '#!/bin/sh' > start.sh && \
    echo 'echo "NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL" > .env' >> start.sh && \
    echo 'echo "NEXT_PUBLIC_SUPABASE_KEY=$NEXT_PUBLIC_SUPABASE_KEY" >> .env' >> start.sh && \
    echo 'npm start' >> start.sh && \
    chmod +x start.sh

# 暴露端口
EXPOSE 3000

# 设置启动命令
CMD ["/bin/sh", "/app/start.sh"]
