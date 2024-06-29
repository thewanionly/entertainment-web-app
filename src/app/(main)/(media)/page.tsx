import { MediaCarouselSection } from '../_ui/MediaCarouselSection';
import { MediaCategoryValue } from '../_utils/media.types';
import { MOVIE_CATEGORY, MovieCategory } from '../_utils/movies.constants';
import { TV_CATEGORY, TvCategory } from '../_utils/tv.constants';

enum HomePageSection {
  TRENDING_MOVIES = 'trendingMovies',
  POPULAR_MOVIES = 'popularMovies',
  NOW_PLAYING_MOVIES = 'nowPlayingMovies',
  UPCOMING_MOVIES = 'upcomingMovies',
  TOP_RATED_MOVIES = 'topRatedMovies',
  TRENDING_TV = 'trendingTvSeries',
  POPULAR_TV = 'popularTvSeries',
  NOW_PLAYING_TV = 'nowPlayingTvSeries',
  UPCOMING_TV = 'upcomingTvSeries',
  TOP_RATED_TV = 'topRatedTvSeries',
}

const HOME_PAGE_SECTIONS: Record<
  HomePageSection,
  MediaCategoryValue<MovieCategory | TvCategory>
> = {
  trendingMovies: MOVIE_CATEGORY.trending,
  trendingTvSeries: TV_CATEGORY.trending,
  popularMovies: MOVIE_CATEGORY.popular,
  popularTvSeries: TV_CATEGORY.popular,
  nowPlayingMovies: MOVIE_CATEGORY['now-playing'],
  nowPlayingTvSeries: TV_CATEGORY['airing-today'],
  upcomingMovies: MOVIE_CATEGORY.upcoming,
  upcomingTvSeries: TV_CATEGORY['on-the-air'],
  topRatedMovies: MOVIE_CATEGORY['top-rated'],
  topRatedTvSeries: TV_CATEGORY['top-rated'],
};

const homePagePromises = Object.values(HOME_PAGE_SECTIONS).map(({ promise }) => promise);
const homePageSectionNames = Object.keys(HOME_PAGE_SECTIONS);
const homePageSectionValues = Object.entries(HOME_PAGE_SECTIONS);

const findPromiseIndex = (targetName: string) =>
  homePageSectionNames.findIndex((name) => name === targetName);

export default async function HomePage() {
  const results = await Promise.all(homePagePromises);

  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      {homePageSectionValues.map(([sectionName, { title }]) => (
        <MediaCarouselSection
          key={sectionName}
          title={title}
          // titleLink={link} TODO: disable link to media category pages for now
          medias={results[findPromiseIndex(sectionName)] ?? []}
        />
      ))}
    </div>
  );
}
