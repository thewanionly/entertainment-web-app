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
      <main className="min-h-[85dvh] w-full pb-6 pt-[56px] sm:pb-8 sm:pt-[128px] lg:min-w-0 lg:pl-[96px] lg:pt-0">
        {children}
      </main>
    </div>
  );
}
