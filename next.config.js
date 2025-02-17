const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'worker_threads': false,
        'fs': false,
        'net': false,
        'tls': false,
      };
    }
    return config;
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig;