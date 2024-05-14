import { ReactNode } from 'react';

import { Navigation } from '@/components/generic/Navigation';
import { cn } from '@/utils/styles';

import { HeaderOrientation } from '../Header.types';
import { getVerticalClasses } from '../Header.utils';
import { HeaderNavLink, NavLinkProps } from '../HeaderNavLink';
import { HeaderNavigationContextProvider, useHeaderNavigation } from './HeaderNavigation.context';

export type HeaderNavigationProps = {
  className?: string;
  orientation?: HeaderOrientation;
  children: ReactNode;
};

type HeaderNavigationItemProps = Omit<NavLinkProps, 'orientation'> & {
  active?: boolean;
};

export const HeaderNavigation = ({
  className = '',
  orientation,
  children,
}: HeaderNavigationProps) => (
  <Navigation className={cn(getVerticalClasses(orientation, 'navList'), className)}>
    <HeaderNavigationContextProvider value={{ orientation }}>
      {children}
    </HeaderNavigationContextProvider>
  </Navigation>
);

export const HeaderNavigationItem = ({ active = false, ...props }: HeaderNavigationItemProps) => {
  const { orientation } = useHeaderNavigation();

  return (
    <Navigation.Item>
      <HeaderNavLink {...props} active={active} orientation={orientation} />
    </Navigation.Item>
  );
};
