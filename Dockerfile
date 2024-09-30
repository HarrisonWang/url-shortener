# 使用官方Node.js镜像作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制项目文件
COPY . .

# 创建一个构建和启动脚本
RUN echo '#!/bin/sh' > start.sh && \
    echo 'echo "NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL" > .env.local' >> start.sh && \
    echo 'echo "NEXT_PUBLIC_SUPABASE_KEY=$NEXT_PUBLIC_SUPABASE_KEY" >> .env.local' >> start.sh && \
    echo 'npm run build && npm start' >> start.sh && \
    chmod +x start.sh

# 暴露端口
EXPOSE 3000

# 设置启动命令
CMD ["/bin/sh", "/app/start.sh"]
