import { extendTheme } from '@chakra-ui/react'

import '@fontsource/roboto-slab'

export const customTheme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: 'linear-gradient(to right, #bf80ff 0%, #cc99ff 19%, #d9b3ff 60%, #e6ccff 100%)',
        fontFamily: '"Roboto slab", sans-serif',
      },
    },
  },
  textStyles: {
    h1: {
      fontSize: '32px',
    },
    text: {
      fontSize: '17px',
    },
  },
  components: {
    Button: {
      baseStyle: {
        colorScheme: 'white',
        width: '90px',
        borderWidth: '1px',
        borderRadius: '16px',
        color: 'blackAlpha.900',
      },
    },
  },
})
