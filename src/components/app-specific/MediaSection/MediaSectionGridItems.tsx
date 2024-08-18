'use client';

import { MediaCardType } from '@/types/medias';

import { MediaGridCard } from '../MediaCard/MediaGridCard';
import { useBookmarkMedia } from '../MediaCard/hooks/useBookmarkMedia';

const NUM_OF_PRIORITY_IMAGES = 4;

type MediaSectionGridItemsProps = {
  medias: MediaCardType[];
};

export const MediaSectionGridItems = ({ medias }: MediaSectionGridItemsProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarkMedia();

  return (
    <>
      {medias.map(({ id, imagePath, title, releaseDate, mediaType, overview }, index) => (
        <li key={`${id}-${index}`} data-testid="grid-item">
          <MediaGridCard
            className="w-full sm:w-full lg:w-full"
            mediaId={id}
            imgSrc={imagePath}
            imgAlt={title}
            prioritizeImg={index < NUM_OF_PRIORITY_IMAGES}
            title={title}
            releaseDate={releaseDate}
            mediaType={mediaType}
            toggleBookmark={toggleBookmark}
            // rating={adult ? 'PG' : 'G'} TODO:
            isBookmarked={isBookmarked(id)}
            overview={overview}
          />
        </li>
      ))}
    </>
  );
};
