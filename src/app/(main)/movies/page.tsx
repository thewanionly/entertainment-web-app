import { fetchSearchMovieResults } from '@/services/medias/fetchSearchResults';
import { cn } from '@/utils/styles';

import { MediaCarouselSection } from '../_ui/MediaCarouselSection';
import { MediaGridSection } from '../_ui/MediaGridSection';
import { MOVIE_CATEGORY } from './_utils/movies.constants';

type MoviesPageProps = {
  searchParams?: {
    q?: string;
  };
};

const allPromises = Object.values(MOVIE_CATEGORY).map(({ promise }) => promise);
const allCategories = Object.keys(MOVIE_CATEGORY);

const findPromiseIndex = (target: string) =>
  allCategories.findIndex((category) => category === target);

export default async function MoviesPage({
  searchParams: { q: searchTerm = '' } = {},
}: MoviesPageProps) {
  if (searchTerm) {
    // movies search page
    const { results, totalResults } = await fetchSearchMovieResults(searchTerm);

    return (
      <MediaGridSection
        className="my-6 sm:my-[2.125rem]"
        title={`Found ${totalResults} movie results for ‘${searchTerm}’`}
        titleTag="p"
        medias={results}
      />
    );
  }

  // movies page (categories presented as carousel sections)
  const results = await Promise.all(allPromises);

  return (
    <>
      <div className="mx-auto mb-10 mt-4 w-[91.467%] sm:mb-12 sm:mt-5 lg:mb-14 lg:mt-6 lg:w-full lg:px-9 2xl:pr-0">
        <h1 className={cn('inline-block capitalize', 'text-heading-m sm:text-heading-l')}>
          Movies
        </h1>
      </div>
      {Object.values(MOVIE_CATEGORY).map(({ name, title, link }) => (
        <MediaCarouselSection
          key={name}
          className="mt-6 sm:mt-[2.125rem]"
          title={title}
          titleClassName="text-[1.125rem] sm:text-heading-m"
          titleLink={link}
          medias={results[findPromiseIndex(name)] ?? []}
        />
      ))}
    </>
  );
}
