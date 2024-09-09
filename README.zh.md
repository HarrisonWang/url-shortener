# URL 短链接生成器

[English](README.md) | [中文](README.zh.md)

URL 短链接生成器是一个免费工具，旨在帮助用户轻松缩短长 URL。我们的目标是让 URL 缩短变得简单、快速且高效。无论您是营销人员、开发者还是任何需要分享链接的人，URL 短链接生成器都能帮助您创建简洁、易管理的链接。

## 关于作者

这个网站是由 [Harrison Wang](https://x.com/voywang) 使用 [Cursor](https://www.cursor.com/) 开发，并在 [Figma](https://www.figma.com/) 中设计。

## 功能

- **即时 URL 缩短**：快速为任何长 URL 生成短链接。
- **自定义短链接**：创建易记和品牌化的短 URL。
- **分析功能**：跟踪您的短链接的使用情况。
- **安全可靠**：确保安全的重定向和链接管理。
- **免费使用**：创建和管理短链接无需任何费用。

## 安装与运行

### 1. 克隆仓库

```bash
git clone https://github.com/voywang/url-shortener.git
```

### 2. 安装依赖

```bash
npm i
```

### 3. 创建 `.env.local` 文件

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 4. 运行开发服务器

```bash
npm run dev
```

### 5. 构建项目

```bash
npm run build
```

### 6. 启动生产服务器

```bash
npm run start
```
