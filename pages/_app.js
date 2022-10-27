import { ChakraProvider } from '@chakra-ui/react'

import { customTheme } from '../styles/theme'

import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen="false" position="bottom-right" />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
