export enum MediaCategory {
  Movie = 'movie',
  TVSeries = 'tv_series',
}

export interface Media {
  imgSrc: string;
  imgAlt: string;
  title: string;
  year: string;
  category: MediaCategory;
  rating?: string;
  isBookmarked: boolean;
  isTrending: boolean;
}
