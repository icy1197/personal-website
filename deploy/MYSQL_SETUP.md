# MySQL安装和配置指南

## 系统要求
- Windows 10/11 64位
- 至少4GB内存
- 至少5GB磁盘空间

## 安装步骤

### 1. 下载MySQL

1. 访问MySQL官网：https://dev.mysql.com/downloads/installer/
2. 下载MySQL Installer for Windows
3. 选择"MySQL Installer Community"版本

### 2. 安装MySQL

1. 运行下载的安装程序
2. 选择"Developer Default"安装类型
3. 点击"Next"并按照向导完成安装
4. 设置root用户密码（记住这个密码！）
5. 确保MySQL服务设置为"Start MySQL Server at System Startup"

### 3. 配置MySQL

#### 创建数据库
```sql
-- 登录MySQL
mysql -u root -p

-- 创建项目数据库
CREATE DATABASE personal_website;

-- 创建用户（可选）
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON personal_website.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
```

#### 更新后端配置

更新 `backend/.env` 文件：
```
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=personal_website
DB_PORT=3306
```

### 4. 验证安装

```powershell
# 检查MySQL服务状态
sc query MySQL80

# 登录MySQL
mysql -u root -p

# 验证数据库
USE personal_website;
SHOW TABLES;
```

### 5. 启动后端服务

```powershell
cd backend
npm run dev
```

### 6. 数据库同步

首次启动后端服务时，Sequelize会自动创建数据库表：
- users表
- blogs表
- projects表

### 7. 故障排除

#### MySQL服务无法启动
```powershell
# 检查服务状态
sc query MySQL80

# 查看MySQL日志
Get-Content "C:\ProgramData\MySQL\MySQL Server 8.0\Data\DESKTOP-XXXX.err" -Tail 50

# 重新启动服务
net stop MySQL80
net start MySQL80
```

#### 连接被拒绝
```powershell
# 检查MySQL端口
netstat -an | findstr :3306

# 检查防火墙设置
netsh advfirewall firewall add rule name="MySQL" dir=in action=allow protocol=TCP localport=3306
```

### 8. MySQL工具推荐

1. **MySQL Workbench** - 官方GUI工具
   - 下载地址：https://dev.mysql.com/downloads/workbench/
   - 连接字符串：`localhost:3306`

2. **Navicat** - 第三方数据库管理工具
   - 下载地址：https://www.navicat.com/

### 9. 安全配置（可选）

```sql
-- 修改root密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_strong_password';

-- 删除匿名用户
DELETE FROM mysql.user WHERE User='';
FLUSH PRIVILEGES;

-- 移除测试数据库
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';
FLUSH PRIVILEGES;
```

## 连接测试

启动后端服务后，测试API端点：
```powershell
curl http://localhost:3001/api/projects
```

如果返回空数组 `[]`，说明数据库连接成功！

## 数据备份

```powershell
# 备份数据库
mysqldump -u root -p personal_website > backup.sql

# 恢复数据库
mysql -u root -p personal_website < backup.sql
```

## 常见问题

### 1. 密码验证失败
- 确保.env文件中的密码与MySQL设置的密码一致
- 检查用户权限

### 2. 数据库不存在
- 确保已创建数据库：`CREATE DATABASE personal_website;`
- 检查.env文件中的数据库名称

### 3. 端口占用
- 默认端口：3306
- 使用 `netstat -an | findstr :3306` 检查端口占用情况

### 4. Sequelize同步失败
- 检查MySQL用户权限
- 确保数据库已创建
- 查看控制台错误信息

## 数据库表结构

### users表
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- createdAt (DATETIME)
- updatedAt (DATETIME)

### blogs表
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- title (VARCHAR)
- content (TEXT)
- tags (JSON)
- authorId (INT, FOREIGN KEY)
- createdAt (DATETIME)
- updatedAt (DATETIME)

### projects表
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- title (VARCHAR)
- description (TEXT)
- technologies (JSON)
- githubUrl (VARCHAR)
- demoUrl (VARCHAR)
- imageUrl (VARCHAR)
- createdAt (DATETIME)
- updatedAt (DATETIME)