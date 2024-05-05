/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "02xz.com",
      },
      {
        protocol: "https",
        hostname: "cf.cjdropshipping.com",
      },
      {
        protocol: "https",
        hostname: "img.alicdn.com",
      },
    ],
  },
};

export default nextConfig;
