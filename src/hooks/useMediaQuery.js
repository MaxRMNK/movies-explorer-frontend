import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const getMatches = (query) => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }


  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => { matchMedia.removeEventListener('change', handleChange) };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
