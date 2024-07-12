import { MediaCardType } from '@/types/medias';

export interface MediaCategoryValue<T> {
  title: string;
  name: T;
  promise: Promise<MediaCardType[]>;
  link?: string;
}
