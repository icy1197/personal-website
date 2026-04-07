#!/bin/bash

# 部署脚本 - 传统服务器部署方案

echo "开始部署个人网站项目..."

# 1. 部署前端
echo "部署前端..."
cd /var/www
rm -rf frontend
mkdir frontend
cp -r /path/to/your/local/project/dist/* frontend/

# 2. 部署后端
echo "部署后端..."
cd /var/www
rm -rf backend
mkdir backend
cp -r /path/to/your/local/project/backend/* backend/
cd backend
npm install --production

# 3. 配置Nginx
echo "配置Nginx..."
cp /path/to/your/local/project/deploy/nginx.conf /etc/nginx/sites-available/personal-website
ln -s /etc/nginx/sites-available/personal-website /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# 4. 启动后端服务
echo "启动后端服务..."
pm2 start /path/to/your/local/project/deploy/ecosystem.config.js
pm2 save
pm2 startup

echo "部署完成！"
echo "请访问 http://your-domain.com"