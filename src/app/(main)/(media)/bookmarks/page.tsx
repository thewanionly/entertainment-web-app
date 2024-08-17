import { BookmarksBasePage } from './_ui/BookmarksBasePage/BookmarksBasePage';

type BookmarksPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default async function BookmarksPage({}: BookmarksPageProps) {
  return <BookmarksBasePage />;
}
