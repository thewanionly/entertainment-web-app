import { fetchSearchMovieResults } from '@/services/medias/fetchSearchResults';

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
        title={`Found ${totalResults} results for ‘${searchTerm}’`}
        titleTag="p"
        medias={results}
      />
    );
  }

  // movies page (categories presented as carousel sections)
  const results = await Promise.all(allPromises);

  return Object.values(MOVIE_CATEGORY).map(({ name, title, link }) => (
    <MediaCarouselSection
      key={name}
      className="mt-6 sm:mt-[2.125rem]"
      title={title}
      titleLink={link}
      medias={results[findPromiseIndex(name)] ?? []}
    />
  ));
}
