'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/styles';

import { HEADER_LOGO_ALT_TEXT, HEADER_LOGO_IMG_PATH, NAV_LINKS } from './Header.constants';
import { HeaderOrientation } from './Header.types';
import { getVerticalClasses } from './Header.utils';
import { HeaderNavigation, HeaderNavigationItem } from './HeaderNavigation';

type HeaderProps = {
  className?: string;
  orientation?: HeaderOrientation;
};

export const Header = ({ className = '', orientation }: HeaderProps) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'grid h-14 grid-cols-[1fr_auto_1fr] items-center justify-items-start gap-6 bg-semi-dark-blue px-4',
        'sm:m-6 sm:h-[4.5rem] sm:rounded-[0.625rem] sm:px-6',
        getVerticalClasses(orientation, 'header'),
        className
      )}
    >
      <Link href="/" className="inline-block">
        <div
          className={cn(
            'relative aspect-[1.25] w-[25px]',
            'sm:w-8',
            getVerticalClasses(orientation, 'logo')
          )}
        >
          <Image
            src={HEADER_LOGO_IMG_PATH}
            alt={HEADER_LOGO_ALT_TEXT}
            title="Entertainment Web App Home"
            fill
          />
        </div>
      </Link>

      {NAV_LINKS.length > 0 && (
        <HeaderNavigation orientation={orientation} className="sm:gap-8">
          {NAV_LINKS.map((navLink) => (
            <HeaderNavigationItem
              key={navLink.label}
              active={pathname === navLink.url}
              {...navLink}
            />
          ))}
        </HeaderNavigation>
      )}

      {/* TODO: Avatar */}
      {/* <div className={cn('justify-self-end text-white', getVerticalClasses(orientation, 'avatar'))}>
        A
      </div> */}
    </header>
  );
};
