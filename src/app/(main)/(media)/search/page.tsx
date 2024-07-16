import { Suspense } from 'react';

import { Metadata } from 'next';

import { redirect } from '@/lib/navigation';

import { MediaGridSectionSkeleton } from '../_ui/MediaGridSectionSkeleton';
import { SearchPage as SearchPageWrapper } from './_ui/SearchPage';

type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams: { q = '' } }: SearchPageProps) {
  if (!q) redirect('/');

  return (
    <Suspense fallback={<MediaGridSectionSkeleton titleClassName="w-[50%] xs:w-[80%]" />} key={q}>
      <SearchPageWrapper searchTerm={q} />
    </Suspense>
  );
}

export async function generateMetadata({
  searchParams: { q: searchTerm = '' } = {},
}: SearchPageProps): Promise<Metadata> {
  return {
    title: `${searchTerm} | Search`,
  };
}
