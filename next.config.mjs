/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    turbo: false, // 👈 disables Turbopack and uses Webpack instead
  },
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
