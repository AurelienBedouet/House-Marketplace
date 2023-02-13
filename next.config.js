/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    remotePatterns: [
      {hostname: 'source.unsplash.com'},
      {hostname: 'images.unsplash.com'},
      {hostname: 'firebasestorage.googleapis.com'},
    ],
  },
};

module.exports = nextConfig;
