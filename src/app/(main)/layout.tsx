import type { Metadata } from 'next';

import { SearchSection } from '@/app/ui/SearchSection';
import { Header } from '@/components/app-specific/Header';
import { outfit } from '@/lib/fonts';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Entertainment Web App',
  description:
    'A web app that lets you search for your favourite movies and TV shows and bookmark them.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="max-w-screen-xl bg-dark-blue text-body-s text-white lg:mx-auto lg:flex lg:pl-8">
        <Header />
        <div className="lg:min-w-0 lg:flex-initial">
          <SearchSection />
          {children}
        </div>
      </body>
    </html>
  );
}
