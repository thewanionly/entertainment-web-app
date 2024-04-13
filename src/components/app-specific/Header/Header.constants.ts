// TODO: move these in a CMS and place this under Header.mocks.ts
import { IconName } from '../Icon/iconMap';

// logo
export const HEADER_LOGO_ALT_TEXT = `Entertainment Web App's Logo`;
export const HEADER_LOGO_IMG_PATH = '/logo.svg';

// Nav links

export type NavLinkType = {
  url: string;
  label: string;
  icon: IconName;
};

export const NAV_LINKS: NavLinkType[] = [
  {
    url: '/',
    label: 'home',
    icon: 'NavHome',
  },
  {
    url: '/movies',
    label: 'movies',
    icon: 'NavMovies',
  },
  {
    url: '/tv-series',
    label: 'tv-series',
    icon: 'NavTVSeries',
  },
  {
    url: '/bookmarks',
    label: 'bookmarks',
    icon: 'NavBookmark',
  },
];
