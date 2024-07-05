import { MediaModal } from '@/components/app-specific/MediaModal';

export default function MediaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MediaModal />
      {children}
    </>
  );
}
