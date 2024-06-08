import { SearchSection } from '../sections/SearchSection';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchSection />
      {children}
    </>
  );
}
