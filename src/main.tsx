import React from 'react';
import ReactDOM from 'react-dom/client';

import { ErrorBoundary } from '~components/ErrorBoundary/errorBoundary.tsx';
import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
