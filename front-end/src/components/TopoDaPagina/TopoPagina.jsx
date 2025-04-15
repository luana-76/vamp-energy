import { useEffect } from 'react';

export function TopoPagina() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return null;
}
