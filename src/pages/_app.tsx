import Head from "next/head"
import React from "react"

function MyApp({ Component, pageProps }) {
  const title = Component?.Title ?? null
  const Layout = Component?.Layout ?? React.Fragment

  return (
    <>
      <Head>
        <title>Robbie Symonds {title && ` - ${title}`}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
