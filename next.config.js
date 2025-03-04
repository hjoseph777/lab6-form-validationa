/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // If your repository name is different from the base path of your site:
  basePath: process.env.NODE_ENV === 'production' ? '/lab6-form-validationa' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
