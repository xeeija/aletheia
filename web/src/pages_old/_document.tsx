import { Head, Html, Main, NextScript } from "next/document"

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/svg" href="/favicon.svg"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
