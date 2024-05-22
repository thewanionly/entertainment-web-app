import { MediaType } from '@/types/medias';

export interface MediaCardProps {
  imgSrc: string;
  imgAlt: string;
  title: string;
  year: string;
  category: MediaType;
  rating?: string;
  isBookmarked: boolean;
  className?: string;
  hoverBookmark?: boolean; // only for storybook
  hoverCard?: boolean; // only for storybook
  isHoverable?: boolean; // only for storybook and testing purposes
}
