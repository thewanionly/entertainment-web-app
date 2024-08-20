import { BookmarkRemovalAlertDialog } from '@/components/app-specific/BookmarkRemovalAlertDialog';
import { MediaModal } from '@/components/app-specific/MediaModal';

export default function MediaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MediaModal />
      <BookmarkRemovalAlertDialog />
      {children}
    </>
  );
}
