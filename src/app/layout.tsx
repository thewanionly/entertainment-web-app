import type { Metadata } from 'next';

// import { Header } from '@/components/app-specific/Header';
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
      <body>
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}
