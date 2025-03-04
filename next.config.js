/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Ensure basePath is set correctly
  basePath: process.env.NODE_ENV === 'production' ? '/lab6-form-validationa' : '',
  // Add assetPrefix to match basePath in production
  assetPrefix: process.env.NODE_ENV === 'production' ? '/lab6-form-validationa' : '',
  // Add trailing slash to help with path resolution
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
