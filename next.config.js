/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      enabled: false,
    },
  },
};

module.exports = {
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};