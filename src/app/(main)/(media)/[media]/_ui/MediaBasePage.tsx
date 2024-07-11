import { getMedias } from '@/app/actions/getMedias';
import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import {
  MediaSectionGrid,
  MediaSectionGridItems,
} from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MediaSectionGridMoreItems } from '@/components/app-specific/MediaSection/MediaSectionGridMoreItems';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';

import { MEDIA_DATA, MediaPageType } from '../_utils/media.constants';

type MediaBasePageProps = {
  mediaPageType: MediaPageType;
};

export const MediaBasePage = async ({ mediaPageType }: MediaBasePageProps) => {
  const { title } = MEDIA_DATA[mediaPageType] ?? {};

  const loadMoreMedias = async (page: number) => {
    'use server';

    return (await getMedias({ media: mediaPageType, page })).results;
  };

  const { results: medias, totalPages } = await getMedias({ media: mediaPageType });

  return (
    <MediaSection>
      <MediaSectionTitle titleTag="h1">{title}</MediaSectionTitle>
      <MediaSectionGrid>
        <MediaSectionGridItems medias={medias} />
        <MediaSectionGridMoreItems totalPages={totalPages} loadMoreFn={loadMoreMedias} />
      </MediaSectionGrid>
    </MediaSection>
  );
};
