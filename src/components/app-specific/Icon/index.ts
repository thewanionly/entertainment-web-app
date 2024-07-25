import { ComponentType } from 'react';

import dynamic from 'next/dynamic';

import { SVGRElement } from 'svgr';

export type IconComponentType = ComponentType<{ className?: string; title?: string } | SVGRElement>;

export const About: IconComponentType = dynamic(() => import('public/icons/icon-about.svg'));
export const BookMarkEmpty: IconComponentType = dynamic(
  () => import('public/icons/icon-bookmark-empty.svg')
);
export const BookMarkFull: IconComponentType = dynamic(
  () => import('public/icons/icon-bookmark-full.svg')
);
export const MediaTypeMovie: IconComponentType = dynamic(
  () => import('public/icons/icon-media-type-movie.svg')
);
export const MediaTypeTV: IconComponentType = dynamic(
  () => import('public/icons/icon-media-type-tv.svg')
);
export const NavBookmark: IconComponentType = dynamic(
  () => import('public/icons/icon-nav-bookmark.svg')
);
export const NavHome: IconComponentType = dynamic(() => import('public/icons/icon-nav-home.svg'));
export const NavMovies: IconComponentType = dynamic(
  () => import('public/icons/icon-nav-movies.svg')
);
export const NavTVSeries: IconComponentType = dynamic(
  () => import('public/icons/icon-nav-tv-series.svg')
);
export const Play: IconComponentType = dynamic(() => import('public/icons/icon-play.svg'));
export const Search: IconComponentType = dynamic(() => import('public/icons/icon-search.svg'));
