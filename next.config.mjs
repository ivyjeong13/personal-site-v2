/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'ffxivcollect.com',
      },
      {
        protocol: 'https',
        hostname: 'img2.finalfantasyxiv.com',
      },
    ],
  },
};

export default nextConfig;
