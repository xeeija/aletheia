import localFont from "next/font/local"

export const productSans = localFont({
  variable: "--font-family",
  src: [
    {
      path: "./fonts/ProductSans-Light.woff",
      weight: "300",
    },
    {
      path: "./fonts/ProductSans-Regular.woff",
      weight: "400",
    },
    {
      path: "./fonts/ProductSans-Medium.woff",
      weight: "500",
    },
    {
      path: "./fonts/ProductSans-Bold.woff",
      weight: "700",
    },
    {
      path: "./fonts/ProductSans-Black.woff",
      weight: "800",
    },
  ],
  fallback: [
    "Product Sans",
    // System default fonts as backup
    "Segoe UI",
    "Helvetica Neue",
    "-apple-system",
    "sans-serif",
  ],
})
