import { MediaGridSection } from '@/app/(main)/_ui/MediaGridSection';
import { MOVIE_CATEGORY, MovieCategory } from '@/app/(main)/movies/_utils/movies.constants';
import { notFound, redirect } from '@/lib/navigation';

type MovieCategoryPageProps = {
  params: {
    slug: string;
  };
  searchParams?: {
    q?: string;
  };
};

export default async function MovieCategoryPage({ params }: MovieCategoryPageProps) {
  const { slug } = params ?? {};

  if (!slug) {
    // if user is in /movies/category, redirect to /movies
    redirect('/movies');
  }

  const category = slug[0];

  if (slug.length > 1) {
    // if user is more than one-level deep after category e.g. /movies/category/popular/test, redirect to /movies/category/popular
    redirect(`/movies/category/${category}`);
  }

  // check if slug[0] is valid category
  if (!Object.keys(MOVIE_CATEGORY).includes(category)) {
    notFound();
  }

  const { pageTitle, promise } = MOVIE_CATEGORY[category as unknown as MovieCategory];
  const results = await promise;

  return <MediaGridSection className="my-6 sm:my-[2.125rem]" title={pageTitle} medias={results} />;
}
