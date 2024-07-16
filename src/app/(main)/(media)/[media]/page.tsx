import { Suspense } from 'react';

import { Metadata } from 'next';

import { notFound } from '@/lib/navigation';

import { MediaGridSectionSkeleton } from '../_ui/MediaGridSectionSkeleton';
import { MediaBasePage } from './_ui/MediaBasePage';
import { MediaSearchPage } from './_ui/MediaSearchPage';
import { MEDIA_DATA, MediaPageType, isValidMedia } from './_utils/media.constants';

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
  if (!isValidMedia(media)) {
    notFound();
  }

  const mediaPageType = media as MediaPageType;

  // media page
  if (!q) {
    return <MediaBasePage mediaPageType={mediaPageType} />;
  }

  // media search page
  return (
    <Suspense fallback={<MediaGridSectionSkeleton titleClassName="w-[50%] xs:w-[80%]" />} key={q}>
      <MediaSearchPage mediaPageType={mediaPageType} searchTerm={q} />
    </Suspense>
  );
}

export async function generateMetadata({
  params: { media = '' },
  searchParams: { q: searchTerm = '' } = {},
}: MediaPageProps): Promise<Metadata> {
  // validate `media`
  if (!isValidMedia(media)) {
    return {
      title: '404 Not Found',
    };
  }

  const { title } = MEDIA_DATA[media as MediaPageType];

  if (searchTerm) {
    return {
      title: `${searchTerm} | Search ${title}`,
    };
  }

  return {
    title,
  };
}
