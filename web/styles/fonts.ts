import localFont from "next/font/local"

export const productSans = localFont({
  variable: "--font-family",
  src: [
    {
      path: "../public/ProductSans-Light.woff",
      weight: "300",
    },
    {
      path: "../public/ProductSans-Regular.woff",
      weight: "400",
    },
    {
      path: "../public/ProductSans-Medium.woff",
      weight: "500",
    },
    {
      path: "../public/ProductSans-Bold.woff",
      weight: "700",
    },
    {
      path: "../public/ProductSans-Black.woff",
      weight: "800",
    },
  ],
})
