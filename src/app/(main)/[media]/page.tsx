import { getMediaSearchResults } from '@/app/actions/getMediaSearchResults';
import { getMedias } from '@/app/actions/getMedias';
import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import {
  MediaSectionGrid,
  MediaSectionGridItems,
} from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MediaSectionGridMoreItems } from '@/components/app-specific/MediaSection/MediaSectionGridMoreItems';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';
import { notFound } from '@/lib/navigation';

import { MEDIA_DATA, MediaPageType } from './_utils/media.constants';

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

    const loadMoreMedias = async ({ page }: { page: number; searchTerm?: string }) => {
      'use server';

      return (await getMedias(mediaPageType, page)).results;
    };

    const { results: medias, totalPages } = await getMedias(mediaPageType);

    return (
      <MediaSection className="my-6 sm:my-[2.125rem]">
        <MediaSectionTitle className="lg:mb-[2.375rem]">{title}</MediaSectionTitle>
        <MediaSectionGrid>
          <MediaSectionGridItems medias={medias} />
          <MediaSectionGridMoreItems totalPages={totalPages} loadMoreFn={loadMoreMedias} />
        </MediaSectionGrid>
      </MediaSection>
    );
  }

  // media search page
  const { searchLabel } = MEDIA_DATA[mediaPageType] ?? {};

  const loadMoreMediaSearchResults = async ({
    page,
    searchTerm = '',
  }: {
    page: number;
    searchTerm?: string;
  }) => {
    'use server';

    return (await getMediaSearchResults(searchTerm, mediaPageType, page)).results;
  };

  const { results, totalResults, totalPages } = await getMediaSearchResults(
    searchTerm,
    mediaPageType
  );

  return (
    <MediaSection className="my-6 sm:my-[2.125rem]">
      <MediaSectionTitle titleTag="p" className="normal-case">
        {`Found ${totalResults} ${searchLabel} results for ‘${searchTerm}’`}
      </MediaSectionTitle>
      <MediaSectionGrid>
        <MediaSectionGridItems medias={results} />
        <MediaSectionGridMoreItems
          key={searchTerm}
          totalPages={totalPages}
          loadMoreFn={loadMoreMediaSearchResults}
        />
      </MediaSectionGrid>
    </MediaSection>
  );
}
