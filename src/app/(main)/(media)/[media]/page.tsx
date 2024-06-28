import { Metadata } from 'next';

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

export async function generateMetadata({
  params: { media = '' },
  searchParams: { q: searchTerm = '' } = {},
}: MediaPageProps): Promise<Metadata> {
  // validate `media`
  if (!Object.keys(MEDIA_DATA).includes(media)) {
    return {
      title: '404 Not Found',
    };
  }

  const mediaPageType = media as MediaPageType;

  const { title } = MEDIA_DATA[mediaPageType];

  if (searchTerm) {
    return {
      title: `${searchTerm} | Search ${title}`,
    };
  }

  return {
    title,
  };
}

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
