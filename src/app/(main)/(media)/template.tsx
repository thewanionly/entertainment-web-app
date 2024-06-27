import { SearchSection } from '../_ui/SearchSection';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchSection />
      {children}
    </>
  );
}
