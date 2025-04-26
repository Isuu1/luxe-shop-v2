import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**", // Allows all image paths from Sanity CDN
      },
    ],
  },
};

export default nextConfig;
