// TODO: move these in a CMS and place this under Header.mocks.ts

// logo
export const HEADER_LOGO_ALT_TEXT = `Entertainment Web App's Logo`;
export const HEADER_LOGO_IMG_PATH = '/logo.svg';

// Nav links

export type NavLinkType = {
  url: string;
  label: string;
  icon: string;
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

// store the "with md" and "without md" versions of the classes
// need to do it this way since we can't do string interpolation on tailwind classes
// ref: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
export const verticalClasses = {
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

export type VerticalClassKey = keyof typeof verticalClasses;
