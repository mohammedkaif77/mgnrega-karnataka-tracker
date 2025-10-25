// PM2 Ecosystem Configuration
// For MGNREGA Karnataka Tracker

module.exports = {
  apps: [{
    name: 'mgnrega-karnataka-api',
    script: './backend/server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
