module.exports = {
  apps: [
    {
      name: 'tacra-social-hub',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
