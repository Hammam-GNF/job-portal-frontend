import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { useAuth } from './store/auth.store.ts'

function Bootstrap() {
  const hydrate = useAuth((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>
);