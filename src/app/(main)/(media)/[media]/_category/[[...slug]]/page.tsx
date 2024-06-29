import { MEDIA_DATA, MediaPageType } from '@/app/(main)/(media)/[media]/_utils/media.constants';
import { MOVIE_CATEGORY, MovieCategory } from '@/app/(main)/_utils/movies.constants';
import { TV_CATEGORY, TvCategory } from '@/app/(main)/_utils/tv.constants';
import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import {
  MediaSectionGrid,
  MediaSectionGridItems,
} from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';
import { notFound, redirect } from '@/lib/navigation';
import { Media } from '@/types/medias';

type MediaCategoryPageProps = {
  params: {
    media: MediaPageType;
    slug: string[];
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isMovieCategory = (categories: any): categories is typeof MOVIE_CATEGORY => {
  return (categories as typeof MOVIE_CATEGORY)['now-playing'] !== undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTvCategory = (categories: any): categories is typeof TV_CATEGORY => {
  return (categories as typeof TV_CATEGORY)['airing-today'] !== undefined;
};

export default async function MediaCategoryPage({
  params: { media, slug },
}: MediaCategoryPageProps) {
  if (!slug) {
    // if user is in /[media]/category, redirect to /[media]
    redirect(`/${media}`);
  }

  const category = slug[0];
  const { categories } = MEDIA_DATA[media];

  // validate category (slug[0])
  if (!Object.keys(categories).includes(category)) {
    notFound();
  }

  if (slug.length > 1) {
    // if user is more than one-level deep after category e.g. /[media]/category/popular/test, redirect to /[media]/category/popular
    redirect(`/${media}/category/${category}`);
  }

  let mediaCategory;

  if (isMovieCategory(categories)) {
    mediaCategory = categories[category as MovieCategory];
  } else if (isTvCategory(categories)) {
    mediaCategory = categories[category as TvCategory];
  }

  const { title, promise } = mediaCategory ?? {};

  const results = await promise;

  return (
    <MediaSection>
      <MediaSectionTitle className="lg:mb-[2.375rem]">{title}</MediaSectionTitle>
      <MediaSectionGrid>
        <MediaSectionGridItems medias={results as Media[]} />
      </MediaSectionGrid>
    </MediaSection>
  );
}
