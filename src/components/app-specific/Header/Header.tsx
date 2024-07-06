'use client';

import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from '@/lib/navigation';
import { cn } from '@/utils/styles';

import { HEADER_LOGO_ALT_TEXT, HEADER_LOGO_IMG_PATH, NAV_LINKS } from './Header.constants';
import { HeaderOrientation } from './Header.types';
import { getVerticalClasses } from './Header.utils';
import { HeaderNavLink } from './HeaderNavLink';
import { HeaderNavigation, HeaderNavigationItem } from './HeaderNavigation';

type HeaderProps = {
  className?: string;
  orientation?: HeaderOrientation;
};

export const Header = ({ className = '', orientation }: HeaderProps) => {
  const { topLevelPath = '' } = usePathname();
  const topLevelPathUrl = `/${topLevelPath}`;

  return (
    <header
      className={cn(
        'sticky left-0 right-0 top-0 z-50',
        'bg-semi-dark-blue',
        'sm:w-full sm:pb-[2.125rem] sm:pt-4',
        'sm:bg-transparent sm:bg-gradient-to-t sm:from-dark-blue/0 sm:to-dark-blue/90',
        'lg:fixed lg:left-auto lg:right-auto lg:bg-semi-dark-blue lg:bg-none',
        getVerticalClasses(orientation, 'header'),
        className
      )}
    >
      <div
        className={cn(
          'mx-auto w-[91.467%]',
          'grid h-14 grid-cols-[1fr_auto_1fr] items-center justify-items-start gap-6',
          'sm:mx-auto sm:h-[4.5rem] sm:w-[92%] sm:rounded-[0.625rem] sm:bg-semi-dark-blue sm:px-6',
          'lg:rounded-none',
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
              priority
            />
          </div>
        </Link>

        {NAV_LINKS.length > 0 && (
          <HeaderNavigation orientation={orientation} className="sm:gap-8">
            {NAV_LINKS.map((navLink) => (
              <HeaderNavigationItem
                key={navLink.label}
                active={
                  navLink.url === topLevelPathUrl || navLink.relatedUrls?.includes(topLevelPathUrl)
                }
                {...navLink}
              />
            ))}
          </HeaderNavigation>
        )}

        <div
          className={cn('justify-self-end text-white', getVerticalClasses(orientation, 'avatar'))}
        >
          <HeaderNavLink
            url="/about"
            label="About"
            icon="About"
            active={topLevelPathUrl === '/about'}
            orientation={orientation}
          />
          {/* TODO: Avatar */}
        </div>
      </div>
    </header>
  );
};
