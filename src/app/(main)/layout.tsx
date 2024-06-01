import { SearchSection } from '@/app/ui/SearchSection';
import { Header } from '@/components/app-specific/Header';
import '@/styles/globals.css';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-xl lg:mx-auto lg:flex lg:pl-8">
      <Header />
      <main className="pt-[56px] sm:pt-[128px] lg:min-w-0 lg:pl-[96px] lg:pt-0">
        <SearchSection />
        {children}
      </main>
    </div>
  );
}
