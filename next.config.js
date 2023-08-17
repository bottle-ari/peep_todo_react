/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com"], // 이미지를 가져올 도메인을 추가하세요
  },
};

module.exports = nextConfig;
