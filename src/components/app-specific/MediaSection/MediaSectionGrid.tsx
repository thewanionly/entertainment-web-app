import { MediaGridCard } from '@/components/app-specific/MediaCard/MediaGridCard';
import { Media } from '@/types/medias';
import { getYear } from '@/utils/dates';
import { cn } from '@/utils/styles';

type MediaSectionGridProps = {
  medias: Media[];
  className?: string;
};

export const MediaSectionGrid = ({ medias, className }: MediaSectionGridProps) => {
  return (
    <ul
      className={cn(
        'w-full',
        'grid grid-cols-2 gap-4',
        'xs:grid-cols-1',
        'sm:grid-cols-3 sm:gap-x-[1.875rem] sm:gap-y-6',
        'lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8',
        className
      )}
    >
      {medias.map(({ id, imagePath, title, releaseDate, mediaType }, index) => (
        <li key={id} data-testid="grid-item">
          <MediaGridCard
            className="w-full sm:w-full lg:w-full"
            imgSrc={imagePath}
            imgAlt={title}
            prioritizeImg={index === 0}
            title={title}
            year={getYear(releaseDate)}
            mediaType={mediaType}
            // rating={adult ? 'PG' : 'G'} TODO:
            isBookmarked={false}
          />
        </li>
      ))}
    </ul>
  );
};
