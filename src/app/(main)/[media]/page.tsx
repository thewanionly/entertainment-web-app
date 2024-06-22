import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';
import { notFound } from '@/lib/navigation';

import { MediaGridSection } from '../_ui/MediaGridSection';
import { MediaPageMediaSectionGrid } from './_ui/MediaPageMediaSectionGrid';
import { MEDIA_DATA, MediaPageType } from './_utils/media.constants';

export const getMedias = async (media: MediaPageType, page?: number) => {
  'use server';

  const { mediaFetcher } = MEDIA_DATA[media] ?? {};

  const movies = await mediaFetcher({ page });

  return movies;
};

type MediaPageProps = {
  params: {
    media: string;
  };
  searchParams?: {
    q?: string;
  };
};

export default async function MediaPage({
  params: { media = '' },
  searchParams: { q: searchTerm = '' } = {},
}: MediaPageProps) {
  // validate `media`
  if (!Object.keys(MEDIA_DATA).includes(media)) {
    notFound();
  }

  const mediaPageType = media as MediaPageType;

  if (!searchTerm) {
    // media page
    const { title } = MEDIA_DATA[mediaPageType] ?? {};

    const loadMoreMedias = async (page?: number) => {
      'use server';

      return (await getMedias(mediaPageType, page)).results;
    };

    const { results: medias } = await getMedias(mediaPageType);

    return (
      <MediaSection className="my-6 sm:my-[2.125rem]">
        <MediaSectionTitle className="lg:mb-[2.375rem]">{title}</MediaSectionTitle>
        <MediaPageMediaSectionGrid initialMedias={medias} loadMoreMedias={loadMoreMedias} />
      </MediaSection>
    );
  }

  // media search page
  const { searchLabel, searchFetcher } = MEDIA_DATA[mediaPageType] ?? {};
  const { results, totalResults } = await searchFetcher(searchTerm);

  return (
    <MediaGridSection
      className="my-6 sm:my-[2.125rem]"
      title={`Found ${totalResults} ${searchLabel} results for ‘${searchTerm}’`}
      titleTag="p"
      titleClassName="normal-case"
      medias={results}
    />
  );
}
