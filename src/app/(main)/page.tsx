import { MediaCarouselSection } from './_ui/MediaCarouselSection';
import { MediaCategoryValue } from './_utils/media.types';
import { MOVIE_CATEGORY, MovieCategory } from './_utils/movies.constants';

export enum HomePageSection {
  TRENDING_MOVIES = 'trendingMovies',
  POPULAR_MOVIES = 'popularMovies',
  NOW_PLAYING_MOVIES = 'nowPlayingMovies',
  UPCOMING_MOVIES = 'upcomingMovies',
  TOP_RATED_MOVIES = 'topRatedMovies',
}

const HOME_PAGE_SECTIONS: Record<HomePageSection, MediaCategoryValue<MovieCategory>> = {
  trendingMovies: MOVIE_CATEGORY.trending,
  popularMovies: MOVIE_CATEGORY.popular,
  nowPlayingMovies: MOVIE_CATEGORY['now-playing'],
  upcomingMovies: MOVIE_CATEGORY.upcoming,
  topRatedMovies: MOVIE_CATEGORY['top-rated'],
};

const homePagePromises = Object.values(HOME_PAGE_SECTIONS).map(({ promise }) => promise);
const homePageSectionNames = Object.keys(HOME_PAGE_SECTIONS);

const findPromiseIndex = (targetName: string) =>
  homePageSectionNames.findIndex((name) => name === targetName);

export default async function HomePage() {
  const results = await Promise.all(homePagePromises);

  return Object.entries(HOME_PAGE_SECTIONS).map(([sectionName, { title, link }]) => (
    <MediaCarouselSection
      key={sectionName}
      className="mt-6 sm:mt-[2.125rem]"
      title={title}
      titleLink={link}
      medias={results[findPromiseIndex(sectionName)] ?? []}
    />
  ));
}
