/** @type {import('next').NextConfig} */
const nextConfig = {
  // Day 43: Next.js Image Optimization - allow external images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
