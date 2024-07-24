import dynamic from 'next/dynamic';

export const About = dynamic(() => import('public/icons/icon-about.svg'));
export const BookMarkEmpty = dynamic(() => import('public/icons/icon-bookmark-empty.svg'));
export const BookMarkFull = dynamic(() => import('public/icons/icon-bookmark-full.svg'));
export const MediaTypeMovie = dynamic(() => import('public/icons/icon-media-type-movie.svg'));
export const MediaTypeTV = dynamic(() => import('public/icons/icon-media-type-tv.svg'));
export const NavBookmark = dynamic(() => import('public/icons/icon-nav-bookmark.svg'));
export const NavHome = dynamic(() => import('public/icons/icon-nav-home.svg'));
export const NavMovies = dynamic(() => import('public/icons/icon-nav-movies.svg'));
export const NavTVSeries = dynamic(() => import('public/icons/icon-nav-tv-series.svg'));
export const Play = dynamic(() => import('public/icons/icon-play.svg'));
export const Search = dynamic(() => import('public/icons/icon-search.svg'));
