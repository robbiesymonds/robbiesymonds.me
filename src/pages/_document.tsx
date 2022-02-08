import { Html, Head, Main, NextScript } from "next/document"

function MyDocument() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/png" href="/assets/img/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Product+Sans:400,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
