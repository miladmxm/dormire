import type { NextConfig } from "next";

import env from "@/config/env";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  allowedDevOrigins: ["10.147.247.187"],
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    exposeTestingApiInProductionBuild: process.env.EXPOSE_TESTING_API === "1",
  },
  turbopack: {
    rules: {
      "*.svg": [
        {
          loaders: ["@svgr/webpack"],
          condition: {
            not: { query: /url/ },
          },
          as: "*.js",
        },
      ],
    },
  },
  images: {
    minimumCacheTTL: 60,
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: env.S3_PORT,
      },
    ],
  },
};

export default nextConfig;
