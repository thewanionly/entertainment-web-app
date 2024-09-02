// Typings for the media API we are using
// If we decide to change the media API in the future, we change the typings in this file

export interface MediasApiResponse<T> {
  page: number;
  results: T[]; // could be "Movie" or "TV" or "Media"
  total_pages: number;
  total_results: number;
}

export enum MediasApiMediaType {
  MOVIE = 'movie',
  TV = 'tv',
  PERSON = 'person',
}

export interface MediasApiVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface MediasApiVideos {
  id?: number;
  results: MediasApiVideo[];
}

export interface MediasApiMovie {
  adult: boolean;
  backdrop_path: string;
  // belongs_to_collection?: BelongsToCollection;
  budget: number;
  // genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  media_type: MediasApiMediaType;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  // production_companies: ProductionCompany[];
  // production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  // spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: MediasApiVideos;
  vote_average: number;
  vote_count: number;
}

export interface MediasApiTV {
  backdrop_path: string;
  // created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  // genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  // last_episode_to_air: LastEpisodeToAir;
  media_type: MediasApiMediaType;
  name: string;
  // next_episode_to_air?: NextEpisodeToAir;
  // networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  // production_companies: ProductionCompany[];
  // production_countries: ProductionCountry[];
  // seasons: Season[];
  // spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export type MediasApiMedia = MediasApiMovie | MediasApiTV;
