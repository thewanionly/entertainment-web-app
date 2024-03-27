import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';

import './globals.css';

const outfit = Outfit({ weight: ['300', '500'], subsets: ['latin'], display: 'swap' });

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
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
