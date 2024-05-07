'use client';

import Logo from 'public/logo.svg';

import { MediaCarouselCard } from '@/components/app-specific/MediaCard';
import { MediaCategory } from '@/components/app-specific/MediaCard/MediaCard.types';

const mockMediaData = {
  imgSrc: '/images/beyond-earth/trending/large.jpg',
  imgAlt: 'A man wearing cold jacket standing in a rock with waters and cliff around',
  title: `Beyond Earth`,
  year: '2019',
  category: MediaCategory.Movie,
  rating: 'PG',
  isBookmarked: false,
};

export default function Home() {
  return (
    <main>
      <h1>Entertainment Web App</h1>
      <Logo />
      <MediaCarouselCard {...mockMediaData} />
    </main>
  );
}
