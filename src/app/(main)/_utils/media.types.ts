import { Media } from '@/types/medias';

export interface MediaCategoryValue<T> {
  title: string;
  name: T;
  promise: Promise<Media[]>;
  link?: string;
}
