import { MediaType } from '@/types/medias';

export interface Media {
  imgSrc: string;
  imgAlt: string;
  title: string;
  year: string;
  category: MediaType;
  rating?: string;
  isBookmarked: boolean;
  isTrending: boolean;
}
