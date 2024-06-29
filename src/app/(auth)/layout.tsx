import Image from 'next/image';
import Link from 'next/link';

import {
  HEADER_LOGO_IMG_PATH,
  HEADER_LOGO_ALT_TEXT,
} from '@/components/app-specific/Header/Header.constants';
import '@/styles/globals.css';
import { cn } from '@/utils/styles';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-limit lg:mx-auto">
      <Link href="/" className="inline-block">
        <div className={cn('relative aspect-[1.25] w-[25px]', 'sm:w-8')}>
          <Image
            src={HEADER_LOGO_IMG_PATH}
            alt={HEADER_LOGO_ALT_TEXT}
            title="Entertainment Web App Home"
            fill
            priority
          />
        </div>
      </Link>
      {children}
    </div>
  );
}
