# Planktonfly LLC 网站运行和部署指南

## 1. 本地开发运行

### 前置要求
- Node.js (版本 14+ 推荐)
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

开发服务器将在 `http://localhost:5173` 启动，支持热重载。

### 预览生产构建
```bash
npm run build
npm run preview
```

## 2. 部署选项

### 方式一：Vercel 部署（推荐）

Vercel 是部署 React 应用最简单的方式，提供免费 SSL 和全球 CDN。

#### 步骤：
1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 导入 GitHub 仓库
4. Vercel 会自动检测 Vite 配置并部署
5. 完成！你的网站会获得一个 `yourproject.vercel.app` 的域名

#### 手动部署（CLI）：
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 方式二：Netlify 部署

Netlify 同样提供免费的托管服务。

#### 步骤：
1. 将代码推送到 GitHub
2. 访问 [netlify.com](https://netlify.com)
3. 点击 "New site from Git"
4. 选择你的仓库
5. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 点击 "Deploy site"

#### 手动部署（CLI）：
```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 登录
netlify login

# 初始化并部署
netlify init
netlify deploy --prod
```

### 方式三：GitHub Pages 部署

适合静态网站部署。

#### 步骤：
1. 安装 gh-pages：
```bash
npm install --save-dev gh-pages
```

2. 在 `package.json` 中添加部署脚本：
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. 在 `vite.config.js` 中添加 base 路径：
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // 替换为你的仓库名
})
```

4. 部署：
```bash
npm run deploy
```

### 方式四：传统服务器部署

#### 构建项目：
```bash
npm run build
```

构建完成后，`dist` 文件夹包含所有静态文件。

#### Nginx 配置示例（推荐方式 - 静态文件）：
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # 直接指向构建后的静态文件目录
    root /path/to/business-website-template/dist;
    index index.html;

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 处理 React Router（单页应用）
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 反向代理方式（不推荐用于生产）：
如果您想使用反向代理到开发服务器（仅用于测试）：

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

⚠️ **注意**：反向代理方式不推荐用于生产环境，因为：
- 开发服务器不稳定
- 性能较差
- 需要持续运行 Node.js 进程

#### Apache 配置示例：
在 `dist` 目录创建 `.htaccess` 文件：
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 3. 自定义域名

### Vercel/Netlify
1. 在项目设置中添加自定义域名
2. 按照指示更新 DNS 记录
3. 等待 SSL 证书自动配置（通常几分钟）

### 独立服务器
1. 配置 DNS A 记录指向服务器 IP
2. 安装 SSL 证书（推荐使用 Let's Encrypt）

## 4. 环境变量（如需要）

如需添加环境变量：

### 开发环境
创建 `.env.local` 文件：
```
VITE_API_URL=https://api.llmproai.xyz
```

### 生产环境
- Vercel: 在项目设置中添加环境变量
- Netlify: 在 Site settings > Build & deploy > Environment 中添加
- 传统服务器: 在构建前设置环境变量

## 5. 性能优化建议

### 图片优化
- 使用 WebP 格式
- 压缩图片大小
- 实现懒加载

### 代码分割
Vite 已自动实现代码分割，但可以进一步优化：
```javascript
// 动态导入组件
const Component = lazy(() => import('./Component'))
```

### CDN 使用
考虑将静态资源托管在 CDN 上以加速加载。

## 6. 监控和分析

### 推荐工具：
- Google Analytics
- Vercel Analytics（如果使用 Vercel）
- Sentry（错误监控）

---

## 快速开始命令

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 构建生产版本
npm run build

# 4. 预览生产版本
npm run preview
```

访问 http://localhost:5173 查看效果！

