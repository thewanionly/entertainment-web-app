import { Suspense } from 'react';

import { MediaGridSectionSkeleton } from '../_ui/MediaGridSectionSkeleton';
import { BookmarksBasePage } from './_ui/BookmarksBasePage/BookmarksBasePage';
import { BookmarksSearchPage } from './_ui/BookmarksSearchPage/BookmarksSearchPage';

type BookmarksPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default async function BookmarksPage({
  searchParams: { q: searchTerm = '' } = {},
}: BookmarksPageProps) {
  // bookmarks page
  if (!searchTerm) {
    return <BookmarksBasePage />;
  }

  // bookmarks search page
  return (
    <Suspense
      fallback={<MediaGridSectionSkeleton titleClassName="w-[50%] xs:w-[80%]" />}
      key={searchTerm}
    >
      <BookmarksSearchPage searchTerm={searchTerm} />
    </Suspense>
  );
}
