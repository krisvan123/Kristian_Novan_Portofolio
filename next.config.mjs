/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allows unoptimized local/fallback images if needed during static export or dev
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/images/certificates/Icoris-2026-author.jpg",
        destination: "/images/certificates/icoris-2026-author.jpg",
      },
    ];
  },
};

export default nextConfig;
