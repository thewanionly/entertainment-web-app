import { MediaGridSection } from '@/app/(main)/_ui/MediaGridSection';
import { MOVIE_CATEGORY, MovieCategory } from '@/app/(main)/_utils/movies.constants';
import { notFound, redirect } from '@/lib/navigation';

type TvCategoryPageProps = {
  params: {
    slug: string;
  };
  searchParams?: {
    q?: string;
  };
};

export default async function TvCategoryPage({ params }: TvCategoryPageProps) {
  const { slug } = params ?? {};

  if (!slug) {
    // if user is in /tv/category, redirect to /tv
    redirect('/tv');
  }

  const category = slug[0];

  // check if slug[0] is valid category
  if (!Object.keys(MOVIE_CATEGORY).includes(category)) {
    notFound();
  }

  if (slug.length > 1) {
    // if user is more than one-level deep after category e.g. /tv/category/popular/test, redirect to /tv/category/popular
    redirect(`/tv/category/${category}`);
  }

  const { title, promise } = MOVIE_CATEGORY[category as unknown as MovieCategory];
  const results = await promise;

  return <MediaGridSection className="my-6 sm:my-[2.125rem]" title={title} medias={results} />;
}
