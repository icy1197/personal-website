# 个人网站部署指南 - 传统服务器部署方案

## 环境要求
- Linux服务器（推荐Ubuntu 20.04+）
- Node.js 18+
- MongoDB 4.4+
- Nginx 1.18+
- PM2（进程管理）

## 部署步骤

### 1. 准备服务器环境

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装MongoDB
sudo apt install -y mongodb
sudo systemctl enable mongodb
sudo systemctl start mongodb

# 安装Nginx
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# 安装PM2
npm install -g pm2
```

### 2. 创建项目目录

```bash
sudo mkdir -p /var/www/frontend
sudo mkdir -p /var/www/backend
sudo chown -R $USER:$USER /var/www
```

### 3. 部署前端

```bash
# 将本地构建好的前端文件复制到服务器
scp -r dist/* your-server:/var/www/frontend/
```

### 4. 部署后端

```bash
# 将后端代码复制到服务器
scp -r backend/* your-server:/var/www/backend/

# 在服务器上安装依赖
ssh your-server "cd /var/www/backend && npm install --production"
```

### 5. 配置Nginx

```bash
# 复制Nginx配置
scp deploy/nginx.conf your-server:/etc/nginx/sites-available/personal-website

# 创建软链接
ssh your-server "ln -s /etc/nginx/sites-available/personal-website /etc/nginx/sites-enabled/"

# 测试并重启Nginx
ssh your-server "nginx -t && sudo systemctl reload nginx"
```

### 6. 启动后端服务

```bash
# 复制PM2配置
scp deploy/ecosystem.config.js your-server:/var/www/backend/

# 启动后端服务
ssh your-server "cd /var/www/backend && pm2 start ecosystem.config.js"

# 设置开机自启
ssh your-server "pm2 save && pm2 startup"
```

### 7. 配置域名（可选）

1. 在域名注册商处设置DNS解析
2. 将域名A记录指向服务器IP地址
3. 更新Nginx配置中的`server_name`

## 环境变量配置

### 前端环境变量（前端根目录创建.env.production）
```
VITE_API_URL=https://your-domain.com/api
```

### 后端环境变量（后端目录创建.env）
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/personal-website
NODE_ENV=production
```

## 安全配置

### 防火墙设置
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### SSL证书（Let's Encrypt）
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 监控与维护

### PM2管理命令
```bash
pm2 list              # 查看进程列表
pm2 logs              # 查看日志
pm2 restart <app>     # 重启应用
pm2 reload <app>      # 重载应用（零停机）
pm2 stop <app>        # 停止应用
```

### Nginx日志
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## 故障排除

1. **前端无法访问API**：检查Nginx配置中的反向代理设置
2. **后端服务未启动**：检查PM2进程状态和日志
3. **MongoDB连接失败**：确认MongoDB服务是否正常运行
4. **权限问题**：检查文件和目录权限

## 部署脚本使用

```bash
# 设置脚本执行权限
chmod +x deploy/deploy.sh

# 编辑脚本中的路径配置
# 然后执行部署脚本
./deploy/deploy.sh
```

## 注意事项

1. 生产环境中务必使用HTTPS
2. 定期备份数据库
3. 监控服务器资源使用情况
4. 定期更新依赖包