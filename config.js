module.exports = {
  name: 'API',
  version: '1.0',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  base_url: process.env.BASE_URL || 'http://localhost:8080',
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/aprestify',
  }
}