/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Required for JSON assert imports in some Next.js versions
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    })
    return config
  },
}

export default nextConfig
