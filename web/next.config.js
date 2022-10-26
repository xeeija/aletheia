/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: "standalone",
  redirects: async () => ([
    {
      source: "/r/:path",
      destination: "/randomwheel/:path",
      // if true, instructs clients/search engines to cache the redirect forever
      // if false not cached
      permanent: true,
    }
  ])
}
