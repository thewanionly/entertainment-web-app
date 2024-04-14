'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/styles';

import { HEADER_LOGO_ALT_TEXT, HEADER_LOGO_IMG_PATH, NAV_LINKS } from './Header.constants';
import { HeaderOrientation } from './Header.types';
import { getVerticalClasses } from './Header.utils';
import { HeaderNavLink } from './HeaderNavLink';

type HeaderProps = {
  className?: string;
  orientation?: HeaderOrientation;
};

export const Header = ({ className = '', orientation }: HeaderProps) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'grid grid-cols-[1fr_auto_1fr] items-center justify-items-start gap-6 bg-semi-dark-blue px-4 py-[18px]',
        getVerticalClasses(orientation, 'header'),
        className
      )}
    >
      {/*  Logo */}
      <Link href="/" className="inline-block">
        <div className={cn('relative h-5 w-[25px]', getVerticalClasses(orientation, 'logo'))}>
          <Image
            src={HEADER_LOGO_IMG_PATH}
            alt={HEADER_LOGO_ALT_TEXT}
            title="Entertainment Web App Home"
            fill
          />
        </div>
      </Link>

      {/* Navigation links */}
      {NAV_LINKS.length > 0 && (
        <nav>
          <ul className={cn('flex gap-6 xs:gap-4', getVerticalClasses(orientation, 'navList'))}>
            {NAV_LINKS.map((navLink) => (
              <li key={navLink.label}>
                <HeaderNavLink
                  {...navLink}
                  active={pathname === navLink.url}
                  orientation={orientation}
                />
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* TODO: Avatar */}
      {/* <div className={cn('justify-self-end text-white', getVerticalClasses(orientation, 'avatar'))}>
        A
      </div> */}
    </header>
  );
};
