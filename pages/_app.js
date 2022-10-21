import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: 'linear-gradient(to right, #bf80ff 0%, #cc99ff 19%, #d9b3ff 60%, #e6ccff 100%)',
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
