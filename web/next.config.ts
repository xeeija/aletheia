import { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  output: "standalone",
  headers: () => {
    return [
      // Disable buffering for nginx to enable streaming for app router
      // https://nextjs.org/docs/app/guides/self-hosting#streaming-and-suspense
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ]
  },
  redirects: () => [
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

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
