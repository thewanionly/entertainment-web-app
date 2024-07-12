// This is the interface of the Media we want our application components
// to use regardless of what API endpoint we use. The fields here shouldn't
// necessarily be 1:1 with the API we use

export enum MediaType {
  MOVIE = 'movie',
  TV = 'tv',
}

export interface MediaCardType {
  id: number;
  imagePath: string;
  title: string;
  mediaType: MediaType;
  releaseDate?: string;
  certification: string;
  overview?: string;
}

export interface MediaResultsInfo {
  page: number;
  results: MediaCardType[];
  totalPages?: number;
  totalResults?: number;
}
