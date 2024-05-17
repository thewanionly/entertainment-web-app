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
      <div className="lg:min-w-0 lg:flex-initial">
        <SearchSection />
        {children}
      </div>
    </div>
  );
}
