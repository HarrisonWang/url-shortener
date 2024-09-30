# URL 短链接生成器

[English](README.md) | [中文](README.zh.md)

URL 短链接生成器是一个免费工具，旨在帮助用户轻松缩短长 URL。我们的目标是让 URL 缩短变得简单、快速且高效。无论您是营销人员、开发者还是任何需要分享链接的人，URL 短链接生成器都能帮助您创建简洁、易管理的链接。

## 关于作者

这个网站是由 [Harrison Wang](https://x.com/voywang) 使用 [Cursor](https://www.cursor.com/) 开发，主题原作者为 [Viggo](https://x.com/decohack)。

## 功能

- **即时 URL 缩短**：快速为任何长 URL 生成短链接。
- **自定义短链接**：创建易记和品牌化的短 URL。
- **分析功能**：跟踪您的短链接的使用情况。
- **安全可靠**：确保安全的重定向和链接管理。
- **免费使用**：创建和管理短链接无需任何费用。

## 安装与运行

### 1. 部署到 Vercel

点击右侧按钮开始部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHarrisonWang%2Furl-shortener&env=NEXT_PUBLIC_SUPABASE_URL&env=NEXT_PUBLIC_SUPABASE_KEY&project-name=url-shortener&repository-name=url-shortener)

### 2. 使用 Docker 运行

#### 2.1 克隆仓库

```bash
git clone https://github.com/harrisonwang/url-shortener.git
```

#### 2.2 构建 Docker 镜像

```bash
docker build -t url-shortener .
```

#### 2.3 运行 Docker 容器

```bash
# 直接运行
docker run -d -p 3000:3000 url-shortener

# 或者使用 docker compose
docker compose up -d
```

#### 2.4 访问应用

打开浏览器并访问 `http://localhost:3000`，您应该能够看到 URL 短链接生成器的界面。

### 3. 本地运行

#### 3.1 克隆仓库

```bash
git clone https://github.com/harrisonwang/url-shortener.git
```

#### 3.2 安装依赖

```bash
npm i
```

#### 3.3 创建 `.env` 文件

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

#### 3.4 初始化数据库表

在您的 Supabase 项目中运行以下 SQL 命令以创建必要的表：

```sql
create table
  public.links (
    id serial not null,
    url text null,
    slug text null,
    ua text null,
    ip text null,
    status integer null,
    created_at timestamp without time zone null default current_timestamp,
    constraint links_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.logs (
    id serial not null,
    url text null,
    slug text null,
    referer text null,
    ua text null,
    ip text null,
    created_at timestamp without time zone null default current_timestamp,
    constraint logs_pkey primary key (id)
  ) tablespace pg_default;
```

#### 3.5 运行开发服务器

```bash
npm run dev
```
