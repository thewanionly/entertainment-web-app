'use client';

import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from '@/lib/navigation';
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
  const { pathname } = usePathname();

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-50',
        'bg-semi-dark-blue',
        'sm:mx-auto sm:mb-8 sm:mt-6 sm:w-[91.467%] sm:rounded-[0.625rem]',
        'lg:left-auto lg:right-auto',
        getVerticalClasses(orientation, 'header'),
        className
      )}
    >
      <div
        className={cn(
          'mx-auto w-[91.467%]',
          'grid h-14 grid-cols-[1fr_auto_1fr] items-center justify-items-start gap-6',
          'sm:mx-0 sm:h-[4.5rem] sm:w-full sm:px-6',
          getVerticalClasses(orientation, 'headerContainer')
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
                active={navLink.url === pathname || navLink.relatedUrls?.includes(pathname)}
                {...navLink}
              />
            ))}
          </HeaderNavigation>
        )}

        {/* TODO: Avatar */}
        {/* <div className={cn('justify-self-end text-white', getVerticalClasses(orientation, 'avatar'))}>
        A
      </div> */}
      </div>
    </header>
  );
};
