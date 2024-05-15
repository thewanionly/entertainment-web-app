import type { Metadata } from 'next';

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
      <body className="max-w-screen-xl bg-dark-blue text-body-s text-white lg:mx-auto lg:flex lg:items-center lg:gap-9 lg:pl-8">
        <Header />
        {children}
      </body>
    </html>
  );
}
