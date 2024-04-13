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

type HeaderProps = {
  className?: string;
};

type NavLinkProps = NavLinkType & { active: boolean };

const NavLink = ({ url, label, icon, active = false }: NavLinkProps) => {
  const NavIcon = AllIcons[icon as keyof typeof AllIcons];

  if (!NavIcon) {
    console.error(`There's no icon with the name of "${icon}". Please double check the icon name.`);
    return null;
  }

  return (
    <IconButton
      className={cn('group flex h-4 p-0 text-greyish-blue hover:text-red ', active && 'text-white')}
      asChild
    >
      <Link href={url}>
        {NavIcon && <NavIcon className="h-4 w-4" />}
        <IconButtonSrLabel label={label} />
      </Link>
    </IconButton>
  );
};

export const Header = ({ className = '' }: HeaderProps) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'grid grid-cols-[1fr_auto_1fr] items-center justify-items-start bg-semi-dark-blue px-4 py-[18px]',
        className
      )}
    >
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
      {NAV_LINKS.length > 0 && (
        <nav>
          <ul className="flex gap-6">
            {NAV_LINKS.map((navLink) => (
              <li key={navLink.label}>
                <NavLink {...navLink} active={pathname === navLink.url} />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
