import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
<ChakraProvider>
  <Provider store={store}>
    <App />
  </Provider>
</ChakraProvider>,
  document.getElementById('root')
);
