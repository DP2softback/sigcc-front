import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@App';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        {/* <Provider store={store}> */}
          <App />
        {/* </Provider> */}
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)