/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
      },
    ];
  },
  images: {
    domains: ['exp.goorm.io', 'statics.goorm.io'], // 외부 이미지 호스트 추가
  },
};

export default nextConfig;
