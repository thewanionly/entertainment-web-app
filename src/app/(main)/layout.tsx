import { SearchSection } from '@/app/ui/SearchSection';
import { Footer } from '@/components/app-specific/Footer';
import { Header } from '@/components/app-specific/Header';
import '@/styles/globals.css';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-limit lg:mx-auto lg:flex lg:flex-col lg:pl-8">
      <Header />
      <main className="min-h-[85dvh] w-full pt-[56px] sm:pt-[128px] lg:min-w-0 lg:pl-[96px] lg:pt-0">
        <SearchSection />
        {children}
      </main>
      <Footer />
    </div>
  );
}
