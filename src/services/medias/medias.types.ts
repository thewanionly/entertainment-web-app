// Typings for the media API we are using
// If we decide to change the media API in the future, we change the typings in this file

export interface MediasEndpointResponse<T> {
  page: number;
  results: T[]; // could be "Movie" or "TV" or "Media"
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  // belongs_to_collection?: BelongsToCollection;
  budget: number;
  // genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  media_type: string;
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
  vote_average: number;
  vote_count: number;
}

export interface TV {
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
  media_type: string;
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

export type Media = Movie & TV;
