import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dictumlimpieza.com",
      },
    ],
  },
};

export default nextConfig;