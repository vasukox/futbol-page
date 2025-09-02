const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.football-data.org/v4',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  );
};