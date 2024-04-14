import { ReactNode, createContext, useContext } from 'react';

import { HeaderOrientation } from '../Header.types';

type HeaderNavigationContextType = {
  orientation?: HeaderOrientation;
};

const HeaderNavigationContext = createContext<HeaderNavigationContextType | null>(null);

type HeaderNavigationContextProviderProps = {
  value: HeaderNavigationContextType;
  children: ReactNode;
};

export const HeaderNavigationContextProvider = ({
  value,
  children,
}: HeaderNavigationContextProviderProps) => (
  <HeaderNavigationContext.Provider value={value}>{children}</HeaderNavigationContext.Provider>
);

export const useHeaderNavigation = (): HeaderNavigationContextType => {
  const headerNavigationContext = useContext(HeaderNavigationContext);

  if (!headerNavigationContext) {
    throw new Error('useHeaderNavigation should be used within HeaderNavigationContextProvider');
  }

  return headerNavigationContext;
};
