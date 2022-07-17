import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from './context/ThemeProvider';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
