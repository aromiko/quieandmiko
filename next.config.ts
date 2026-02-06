import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Turbopack configuration (Next.js 16+) */
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js"
      },
      "*.gql": {
        loaders: ["graphql-tag/loader"],
        as: "*.js"
      },
      "*.graphql": {
        loaders: ["graphql-tag/loader"],
        as: "*.js"
      }
    }
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: ""
      },
      {
        protocol: "https",
        hostname: "videos.ctfassets.net",
        port: ""
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
