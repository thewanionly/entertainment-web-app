import Link from 'next/link';

import * as AllIcons from '@/components/app-specific/Icon';
import { IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import { NavLinkType } from './Header.constants';
import { HeaderOrientation } from './Header.types';
import { getVerticalClasses } from './Header.utils';

export type NavLinkProps = NavLinkType & {
  className?: string;
  active?: boolean;
  orientation?: HeaderOrientation;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
};

export const HeaderNavLink = ({
  className = '',
  url,
  label,
  icon,
  active = false,
  orientation,
  onClick,
}: NavLinkProps) => {
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
        active && 'text-white',
        className
      )}
      asChild
      onClick={onClick}
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
