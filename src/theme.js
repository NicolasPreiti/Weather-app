import { extendTheme } from '@chakra-ui/react';

const colors = {
  primary: {
    one: '#1B335D',
  },
};

const fonts = {
  primary: 'Poppins',
  secondary: 'Major Mono Display',
};

const theme = extendTheme({ colors, fonts });

export default theme;
