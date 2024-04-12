import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/utils/styles';

import { HEADER_LOGO_ALT_TEXT, HEADER_LOGO_IMG_PATH } from './Header.constants';

type HeaderProps = {
  className?: string;
};

export const Header = ({ className = '' }: HeaderProps) => {
  return (
    <header className={cn('flex bg-semi-dark-blue px-4 py-[18px]', className)}>
      <Link href="/" className="inline-block">
        <div className="relative h-5 w-[25px]">
          <Image
            src={HEADER_LOGO_IMG_PATH}
            alt={HEADER_LOGO_ALT_TEXT}
            title="Entertainment Web App Home"
            fill
          />
        </div>
      </Link>
    </header>
  );
};
