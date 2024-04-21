import { ReactNode, createContext, useContext } from 'react';

type MediaCardContextType = {
  hoverCard?: boolean;
  hoverBookmark?: boolean;
  isBookmarked?: boolean;
};

const MediaCardContext = createContext<MediaCardContextType | null>(null);

type MediaCardContextProviderProps = {
  value: MediaCardContextType;
  children: ReactNode;
};

export const MediaCardContextProvider = ({ value, children }: MediaCardContextProviderProps) => (
  <MediaCardContext.Provider value={value}>{children}</MediaCardContext.Provider>
);

export const useMediaCard = (): MediaCardContextType => {
  const mediaCardContext = useContext(MediaCardContext);

  if (!mediaCardContext) {
    throw new Error('useMediaCard should be used within MediaCardContextProvider');
  }

  return mediaCardContext;
};
