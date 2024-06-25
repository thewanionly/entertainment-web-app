import { notFound } from '@/lib/navigation';

import { MediaBasePage } from './_ui/MediaBasePage';
import { MediaSearchPage } from './_ui/MediaSearchPage';
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
  searchParams: { q = '' } = {},
}: MediaPageProps) {
  // validate `media`
  if (!Object.keys(MEDIA_DATA).includes(media)) {
    notFound();
  }

  const mediaPageType = media as MediaPageType;

  // media page
  if (!q) {
    return <MediaBasePage mediaPageType={mediaPageType} />;
  }

  // media search page
  return <MediaSearchPage mediaPageType={mediaPageType} searchTerm={q} />;
}
