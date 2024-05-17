import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {
  HEADER_LOGO_IMG_PATH,
  HEADER_LOGO_ALT_TEXT,
} from '@/components/app-specific/Header/Header.constants';
import { outfit } from '@/lib/fonts';
import '@/styles/globals.css';
import { cn } from '@/utils/styles';

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
        <Link href="/" className="inline-block">
          <div className={cn('relative aspect-[1.25] w-[25px]', 'sm:w-8')}>
            <Image
              src={HEADER_LOGO_IMG_PATH}
              alt={HEADER_LOGO_ALT_TEXT}
              title="Entertainment Web App Home"
              fill
            />
          </div>
        </Link>
        {children}
      </body>
    </html>
  );
}
