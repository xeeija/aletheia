import { NextConfig } from "next"

export const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // eslint-disable-next-line @typescript-eslint/require-await
  redirects: async () => [
    {
      source: "/r/:path",
      destination: "/randomwheel/:path",
      // if true, instructs clients/search engines to cache the redirect forever
      // if false not cached
      permanent: true,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-cdn.jtvnw.net",
        port: "",
        pathname: "/custom-reward-images/**",
      },
    ],
  },
}

export default nextConfig
