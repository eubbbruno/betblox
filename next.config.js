/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'betblox.com'],
  },
  env: {
    CUSTOM_KEY: 'betblox-premium',
  },
}

module.exports = nextConfig
