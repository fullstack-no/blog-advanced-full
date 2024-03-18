/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
  },

  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};

module.exports = nextConfig;
