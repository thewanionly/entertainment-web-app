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
    url: '/tv',
    label: 'tv',
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
    default:
      'flex h-[calc(100vh_-_4rem)] w-min sm:w-min sm:mx-4 sm:rounded-[20px] sm:mb-0 flex-col gap-[75px] mx-4 rounded-[20px] px-8 py-[35px] mx-0 mb-0 mt-8 max-h-[60rem] min-h-[28.125rem]',
    lg: 'lg:h-[calc(100vh_-_4rem)] lg:w-min lg:rounded-[20px] lg:px-8 lg:py-[35px] lg:mx-0 lg:mb-0 lg:mt-8 lg:max-h-[60rem] lg:min-h-[28.125rem]',
  },
  headerContainer: {
    default: 'flex flex-col gap-[75px] m-0 w-full h-full p-0 sm:h-full sm:px-0',
    lg: 'lg:flex lg:flex-col lg:gap-[75px] lg:m-0 lg:w-full lg:h-full lg:p-0',
  },
  logo: {
    default: 'h-[25.6px] w-8',
    lg: 'lg:h-[25.6px] lg:w-8',
  },
  navList: {
    default: 'flex-col gap-10 items-start',
    lg: 'lg:flex-col lg:gap-10 lg:items-start',
  },
  iconButton: {
    default: 'h-5',
    lg: ' lg:h-5',
  },
  navIcon: {
    default: 'h-5 w-5',
    lg: ' lg:h-5 lg:w-5',
  },
  avatar: {
    default: 'mt-auto',
    lg: ' lg:mt-auto',
  },
};

export type VerticalClassKey = keyof typeof verticalClasses;
