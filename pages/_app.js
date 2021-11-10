import Head from 'next/head'
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Jeu de la mort</title>
        <meta name="description" content="Next ChakraUI Framer Motion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp