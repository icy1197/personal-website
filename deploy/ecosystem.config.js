module.exports = {
  apps: [
    {
      name: 'personal-backend',
      script: './src/server.js',
      cwd: '/var/www/backend',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        MONGODB_URI: 'mongodb://localhost:27017/personal-website'
      }
    }
  ]
};