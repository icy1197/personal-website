import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '个人网站API',
            version: '1.0.0',
            description: '个人网站后端API文档',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: '开发服务器',
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };