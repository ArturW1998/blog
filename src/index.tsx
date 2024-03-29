import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ForceUpdateProvider } from './shared/lib/render/forceUpdate';

import App from '@/app';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ErrorBoundary } from '@/app/providers/errorBoundary';

import './shared/config/i18n/i18n';

const container = document.getElementById('root');

if (!container) {
  throw new Error("There is no DOM element with a 'root' ID.");
}

const root = createRoot(container);

root.render(
  <StoreProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <ForceUpdateProvider>
          <App />
        </ForceUpdateProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StoreProvider>
);
