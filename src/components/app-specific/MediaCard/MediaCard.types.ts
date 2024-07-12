import { ImageLoader } from 'next/image';

import { MediaType } from '@/types/medias';

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
  className?: string;
  prioritizeImg?: boolean;
  hoverBookmark?: boolean; // only for storybook
  hoverCard?: boolean; // only for storybook
  isHoverable?: boolean; // only for storybook and testing purposes
}
