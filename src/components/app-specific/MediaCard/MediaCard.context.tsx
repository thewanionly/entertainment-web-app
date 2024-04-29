import { ReactNode, createContext, useContext, useState } from 'react';

type MediaCardContextType = {
  hoverCard?: boolean;
  hoverBookmark?: boolean;
  isBookmarked?: boolean;
  isHoverable?: boolean;
  showPlayBtn: boolean;
  setShowPlayBtn: (value: boolean) => void;
};

const MediaCardContext = createContext<MediaCardContextType | null>(null);

type MediaCardContextProviderProps = {
  value: Omit<MediaCardContextType, 'showPlayBtn' | 'setShowPlayBtn'>;
  children: ReactNode;
};

export const MediaCardContextProvider = ({ value, children }: MediaCardContextProviderProps) => {
  const [showPlayBtn, setShowPlayBtn] = useState(value.hoverCard ?? false);

  return (
    <MediaCardContext.Provider value={{ ...value, showPlayBtn, setShowPlayBtn }}>
      {children}
    </MediaCardContext.Provider>
  );
};

export const useMediaCard = (): MediaCardContextType => {
  const mediaCardContext = useContext(MediaCardContext);

  if (!mediaCardContext) {
    throw new Error('useMediaCard should be used within MediaCardContextProvider');
  }

  return mediaCardContext;
};
