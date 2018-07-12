module.exports = {
  apps: [

    // First application
    {
      name: 'development',
      script: 'server/server.js',
      watch: true,
      env: {
        "NODE_ENV": "development",
        "DOMAIN_USE": "production"
      },
      env_production: {
        NODE_ENV: 'production'
      },
      watch: [
        "server"
      ]
    }
  ]
};
