import { usePathname as useNextPathname } from 'next/navigation';

type UsePathname = {
  pathname: string;
  pathnameArray: string[];
  topLevelPath: string;
};

export const usePathname = (): UsePathname => {
  const pathname = useNextPathname();
  const pathnameArray = pathname?.split('/').filter((p) => p) ?? [];

  return {
    pathname,
    pathnameArray,
    topLevelPath: pathnameArray[0],
  };
};
