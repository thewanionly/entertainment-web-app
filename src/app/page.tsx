'use client';

import Logo from 'public/logo.svg';

import { MediaCarouselCard } from '@/components/app-specific/MediaCard';

export default function Home() {
  return (
    <main>
      <h1>Entertainment Web App</h1>
      <Logo />

      <MediaCarouselCard
        imgSrc="/images/beyond-earth/trending/large.jpg"
        imgAlt="A man wearing cold jacket standing in a rock with waters and cliff around"
        title="Beyond Earth"
      />
    </main>
  );
}
