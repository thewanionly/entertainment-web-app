import { SearchSection } from '../ui/SearchSection';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchSection />
      {children}
    </>
  );
}
