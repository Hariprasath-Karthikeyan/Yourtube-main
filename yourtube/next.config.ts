import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: "export",
  reactStrictMode: true,
  env: {
    BACKEND_URL: "https://yourtube-main.onrender.com",
    NEXT_PUBLIC_API_URL: "https://yourtube-main.onrender.com",
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "https://yourtube-main.onrender.com/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
