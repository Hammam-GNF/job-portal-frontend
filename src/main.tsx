import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { useAuth } from './store/auth.store.ts'
import './index.css'

function Bootstrap() {
  const hydrate = useAuth((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Bootstrap />
    </BrowserRouter>
  </StrictMode>
);