import { ReactNode } from 'react';

import { Navigation } from '@/components/generic/Navigation';

import { HeaderOrientation } from '../Header.types';
import { getVerticalClasses } from '../Header.utils';
import { HeaderNavLink, NavLinkProps } from '../HeaderNavLink';
import { HeaderNavigationContextProvider, useHeaderNavigation } from './HeaderNavigation.context';

export type HeaderNavigationProps = {
  orientation?: HeaderOrientation;
  children: ReactNode;
};

type HeaderNavigationItemProps = Omit<NavLinkProps, 'orientation'> & {
  active?: boolean;
};

export const HeaderNavigation = ({ orientation, children }: HeaderNavigationProps) => (
  <Navigation className={getVerticalClasses(orientation, 'navList')}>
    <HeaderNavigationContextProvider value={{ orientation }}>
      {children}
    </HeaderNavigationContextProvider>
  </Navigation>
);

const HeaderNavigationItem = ({ active = false, ...props }: HeaderNavigationItemProps) => {
  const { orientation } = useHeaderNavigation();

  return (
    <Navigation.Item>
      <HeaderNavLink {...props} active={active} orientation={orientation} />
    </Navigation.Item>
  );
};

HeaderNavigation.Item = HeaderNavigationItem;
