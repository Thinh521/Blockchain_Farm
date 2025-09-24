import {useEffect, useState} from 'react';

const useDebouncedSearching = (text, delay = 500) => {
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!text) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return isSearching;
};

export default useDebouncedSearching;
