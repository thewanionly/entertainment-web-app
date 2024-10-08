import { ImageLoader } from 'next/image';

import { MediaCardType, MediaType } from '@/types/medias';

export interface MediaCardProps {
  mediaId: number;
  imgSrc: string;
  imgAlt: string;
  customImgLoader?: ImageLoader;
  title: string;
  releaseDate?: string;
  mediaType: MediaType;
  rating?: string;
  overview?: string;
  isBookmarked: boolean;
  toggleBookmark: (media: MediaCardType, mediaCardId?: string) => void;
  className?: string;
  prioritizeImg?: boolean;
  hoverBookmark?: boolean; // only for storybook
  hoverCard?: boolean; // only for storybook
  isHoverable?: boolean; // only for storybook and testing purposes
}
