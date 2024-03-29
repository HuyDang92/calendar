import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ContextWrapper from '~/context/ContextWrapper';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextWrapper>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </ContextWrapper>
  </React.StrictMode>,
);
