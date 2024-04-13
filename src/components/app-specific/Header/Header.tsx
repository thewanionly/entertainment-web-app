'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import * as AllIcons from '@/components/app-specific/Icon';
import { IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import {
  HEADER_LOGO_ALT_TEXT,
  HEADER_LOGO_IMG_PATH,
  NAV_LINKS,
  NavLinkType,
} from './Header.constants';

type HeaderOrientation = 'horizontal' | 'vertical'; // this is for storybook/testing purposes only

type HeaderProps = {
  className?: string;
  orientation?: HeaderOrientation;
};

type NavLinkProps = NavLinkType & { active: boolean; orientation?: HeaderOrientation };

// store the "with md" and "without md" versions of the classes
// need to do it this way since we can't do string interpolation on tailwind classes
// ref: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
const verticalClasses = {
  header: {
    default: 'flex h-screen w-min flex-col gap-[75px] rounded-[20px] px-8 py-[35px]',
    md: 'md:flex md:h-screen md:w-min md:flex-col md:gap-[75px] md:rounded-[20px] md:px-8 md:py-[35px]',
  },
  logo: {
    default: 'h-[25.6px] w-8',
    md: 'md:h-[25.6px] md:w-8',
  },
  navList: {
    default: 'flex-col gap-10',
    md: 'md:flex-col md:gap-10',
  },
  iconButton: {
    default: 'h-5',
    md: ' md:h-5',
  },
  navIcon: {
    default: 'h-5 w-5',
    md: ' md:h-5 md:w-5',
  },
  avatar: {
    default: 'mt-auto',
    md: ' md:mt-auto',
  },
};

type VerticalClassKey = keyof typeof verticalClasses;

const getVerticalClasses = (orientation: HeaderOrientation | undefined, name: VerticalClassKey) => {
  if (orientation === 'vertical') return verticalClasses[name].default;

  if (!orientation) return verticalClasses[name].md;

  return '';
};

const NavLink = ({ url, label, icon, active = false, orientation }: NavLinkProps) => {
  const NavIcon = AllIcons[icon as keyof typeof AllIcons];

  if (!NavIcon) {
    console.error(`There's no icon with the name of "${icon}". Please double check the icon name.`);
    return null;
  }

  return (
    <IconButton
      className={cn(
        'hover:bg-transparent group flex h-4 p-0 text-greyish-blue hover:text-red',
        getVerticalClasses(orientation, 'iconButton'),
        active && 'text-white'
      )}
      asChild
    >
      <Link href={url}>
        {NavIcon && (
          <NavIcon className={cn('h-4 w-4', getVerticalClasses(orientation, 'navIcon'))} />
        )}
        <IconButtonSrLabel label={label} />
      </Link>
    </IconButton>
  );
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
      {NAV_LINKS.length > 0 && (
        <nav>
          <ul className={cn('flex gap-6 xs:gap-4', getVerticalClasses(orientation, 'navList'))}>
            {NAV_LINKS.map((navLink) => (
              <li key={navLink.label}>
                <NavLink {...navLink} active={pathname === navLink.url} orientation={orientation} />
              </li>
            ))}
          </ul>
        </nav>
      )}
      {/* TODO: Avatar component */}
      {/* <div className={cn('justify-self-end text-white', getVerticalClasses(orientation, 'avatar'))}>
        A
      </div> */}
    </header>
  );
};
