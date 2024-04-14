import { ReactNode } from 'react';

import { cn } from '@/utils/styles';

type NavigationProps = {
  className?: string;
  children: ReactNode;
};

type NavigationItemProps = {
  children: ReactNode;
};

export const Navigation = ({ className = '', children }: NavigationProps) => (
  <nav>
    <ul className={cn('flex gap-6 xs:gap-4', className)}>{children}</ul>
  </nav>
);

const NavigationItem = ({ children }: NavigationItemProps) => <li>{children}</li>;

Navigation.Item = NavigationItem;
