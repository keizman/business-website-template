# Nginx 部署指南

## 推荐方式：静态文件部署

### 步骤 1：构建项目
```bash
npm run build
```

这会生成静态文件到 `dist` 目录。

### 步骤 2：上传文件到服务器
将 `dist` 目录的内容上传到服务器，例如：
```bash
scp -r dist/* user@your-server:/var/www/planktonfly/
```

### 步骤 3：配置 Nginx

创建或编辑配置文件：`/etc/nginx/sites-available/planktonfly`

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.llmproai.xyz www.api.llmproai.xyz;

    # 指向构建后的静态文件目录
    root /var/www/planktonfly;
    index index.html;

    # 日志
    access_log /var/log/nginx/planktonfly_access.log;
    error_log /var/log/nginx/planktonfly_error.log;

    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json 
               image/svg+xml;

    # 静态资源缓存（图片、CSS、JS 等）
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # 处理单页应用路由
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # HTTPS 重定向（如果有 SSL 证书）
    # return 301 https://$server_name$request_uri;
}

# HTTPS 配置（如果有 SSL 证书）
# server {
#     listen 443 ssl http2;
#     listen [::]:443 ssl http2;
#     server_name api.llmproai.xyz www.api.llmproai.xyz;
#
#     ssl_certificate /etc/letsencrypt/live/api.llmproai.xyz/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/api.llmproai.xyz/privkey.pem;
#
#     # SSL 优化配置
#     ssl_protocols TLSv1.2 TLSv1.3;
#     ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
#     ssl_prefer_server_ciphers on;
#     ssl_session_cache shared:SSL:10m;
#
#     root /var/www/planktonfly;
#     index index.html;
#
#     location / {
#         try_files $uri $uri/ /index.html;
#     }
# }
```

### 步骤 4：启用配置
```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/planktonfly /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

## 完整部署流程

```bash
# 1. 构建项目
npm run build

# 2. 创建目录
sudo mkdir -p /var/www/planktonfly

# 3. 复制文件
sudo cp -r dist/* /var/www/planktonfly/

# 4. 设置权限
sudo chown -R www-data:www-data /var/www/planktonfly

# 5. 配置 Nginx（如上）

# 6. 启用并重启
sudo nginx -t
sudo systemctl reload nginx
```

## SSL 证书配置（可选但推荐）

使用 Let's Encrypt 免费 SSL 证书：

```bash
# 安装 Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# 获取证书（自动配置 Nginx）
sudo certbot --nginx -d api.llmproai.xyz -d www.api.llmproai.xyz

# 自动续期
sudo certbot renew --dry-run
```

## 验证部署

1. 检查文件是否存在：
```bash
ls -la /var/www/planktonfly/
```

2. 检查 Nginx 状态：
```bash
sudo systemctl status nginx
```

3. 访问网站：
```
http://api.llmproai.xyz
```

## 常见问题

### 问题 1：404 错误
**原因**：React Router 路由问题
**解决**：确保配置中有 `try_files $uri $uri/ /index.html;`

### 问题 2：静态资源 404
**原因**：路径配置错误
**解决**：检查 `dist` 目录结构，确保所有文件都在正确位置

### 问题 3：权限问题
**原因**：文件所有者不正确
**解决**：
```bash
sudo chown -R www-data:www-data /var/www/planktonfly
sudo chmod -R 755 /var/www/planktonfly
```

## 更新网站

每次更新后：
```bash
# 1. 构建新版本
npm run build

# 2. 备份旧版本（可选）
sudo cp -r /var/www/planktonfly /var/www/planktonfly.backup

# 3. 上传新文件
sudo cp -r dist/* /var/www/planktonfly/

# 4. 清理浏览器缓存测试
```

## 性能优化

### 1. 启用 HTTP/2
在 Nginx 配置中添加：
```nginx
listen 443 ssl http2;
```

### 2. 启用 Brotli 压缩（更高压缩率）
安装 brotli 模块：
```bash
sudo apt-get install nginx-module-brotli
```

### 3. CDN 配置
考虑使用 Cloudflare CDN 加速静态资源

## 监控和日志

查看访问日志：
```bash
sudo tail -f /var/log/nginx/planktonfly_access.log
```

查看错误日志：
```bash
sudo tail -f /var/log/nginx/planktonfly_error.log
```

---

## 总结

✅ **推荐方式**：静态文件部署（`npm run build` → Nginx 指向 `dist`）  
❌ **不推荐**：反向代理到开发服务器（`npm run dev` → Nginx 转发）

静态文件部署的优点：
- ✅ 性能最佳
- ✅ 不需要运行 Node.js 进程
- ✅ 资源占用最小
- ✅ 稳定性最好
- ✅ 适合生产环境

