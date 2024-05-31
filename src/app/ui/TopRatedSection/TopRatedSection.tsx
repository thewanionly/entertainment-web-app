'use client';

import { MediaGridCard } from '@/components/app-specific/MediaCard/MediaGridCard';
import { Media } from '@/types/medias';
import { cn } from '@/utils/styles';

import { TOP_RATED_SECTION_HEADING } from './TopRatedSection.constants';

type TopRatedSectionProps = {
  className?: string;
  medias: Media[];
};

export const TopRatedSection = ({ className = '', medias }: TopRatedSectionProps) => {
  return (
    <section className={cn('mx-auto w-[91.467%] overflow-hidden lg:w-full lg:px-9', className)}>
      <h2
        className={cn(
          'mb-4 text-[1.25rem] font-light leading-[normal] tracking-[-0.019375rem]',
          'mb-[1.5625rem] sm:text-heading-l'
        )}
      >
        {TOP_RATED_SECTION_HEADING}
      </h2>
      <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xs:grid-cols-1">
        {medias.map(({ id, imagePath, title, releaseDate, mediaType }, index) => (
          <li key={id} data-testid="grid-item">
            <MediaGridCard
              className="w-full sm:w-full lg:w-full"
              imgSrc={imagePath}
              imgAlt={title}
              prioritizeImg={index === 0}
              title={title}
              year={new Date(releaseDate).getFullYear().toString()}
              mediaType={mediaType}
              // rating={adult ? 'PG' : 'G'} TODO:
              isBookmarked={false}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
