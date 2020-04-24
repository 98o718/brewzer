module.exports = {
  apps: [
    {
      name: 'brewzer-server',
      script: 'node dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3355,
      },
    },
  ],

  deploy: {
    production: {
      user: 'travis',
      host: '51.15.124.103',
      ref: 'origin/master',
      repo: 'git@github.com:98o718/brewzer.git',
      path: '/home/travis/brewzer-server',
      'post-deploy':
        'git-crypt unlock && cd server && yarn && yarn build && pm2 reload ecosystem.config.js --env production',
    },
  },
}
