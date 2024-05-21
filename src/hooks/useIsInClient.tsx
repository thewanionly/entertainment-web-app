import { useEffect, useState } from 'react';

export const useIsInClient = (): boolean => {
  const [isInClient, setIsInClient] = useState(false);

  useEffect(() => {
    setIsInClient(true);
  }, []);

  return isInClient;
};
