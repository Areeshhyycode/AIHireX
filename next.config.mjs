/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
  experimental: {
    // pdf-parse loads its test fixture at import time when run inside a bundler.
    // Keeping it external prevents the bundler from inlining/breaking it.
    serverComponentsExternalPackages: ["pdf-parse"],
  },
};

export default nextConfig;
