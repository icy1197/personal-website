import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import sequelize from './config/database.js';
import { swaggerUi, swaggerSpec } from './config/swagger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 连接数据库
sequelize.authenticate()
    .then(() => {
        console.log('MySQL connected');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

app.use(cors());
app.use(express.json());

// 配置Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API文档地址: http://localhost:${PORT}/api-docs`);
});