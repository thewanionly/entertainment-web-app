import type { Metadata } from 'next';

import { APP_DESCRIPTION, APP_NAME } from '@/constants/app';
import { outfit } from '@/lib/fonts';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-dark-blue text-body-s text-white">{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
};
