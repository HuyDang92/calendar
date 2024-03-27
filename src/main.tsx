import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Theme } from '@radix-ui/themes';
import ContextWrapper from '~/context/ContextWrapper';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme appearance="light">
      <ContextWrapper>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </ContextWrapper>
    </Theme>
  </React.StrictMode>,
);
