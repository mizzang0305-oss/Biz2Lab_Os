import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    localPatterns: [
      {
        pathname: "/images/posts/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
