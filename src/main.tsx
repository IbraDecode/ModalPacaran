import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './app/AppRouter';
import './styles/index.css';
import ThemeWatcher from './components/ThemeWatcher';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeWatcher />
      <AppRouter />
    </BrowserRouter>
  </StrictMode>,
);
