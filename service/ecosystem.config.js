module.exports = {
  apps: [
    {
      name: 'tacra-social-hub',
      script: 'dist/src/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
