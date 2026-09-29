/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allows unoptimized local/fallback images if needed during static export or dev
    unoptimized: true,
  },
};

export default nextConfig;
