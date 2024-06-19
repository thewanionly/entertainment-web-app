import { MediaGridCard } from '@/components/app-specific/MediaCard/MediaGridCard';
import { Media } from '@/types/medias';
import { getYear } from '@/utils/dates';
import { cn } from '@/utils/styles';

type TopRatedSectionProps = {
  className?: string;
  title: string;
  titleClassName?: string;
  titleTag?: keyof JSX.IntrinsicElements;
  medias: Media[];
};

export const MediaGridSection = ({
  className = '',
  title,
  titleClassName = '',
  titleTag: TitleTag = 'h2',
  medias,
}: TopRatedSectionProps) => {
  return (
    <section
      className={cn('mx-auto w-[91.467%] overflow-hidden lg:w-full lg:px-9 2xl:pr-0', className)}
    >
      <TitleTag
        className={cn(
          'inline-block capitalize',
          'mb-6 text-[1.25rem] font-light leading-[normal] tracking-[-0.019375rem]',
          'sm:text-heading-l lg:mb-8',
          titleClassName
        )}
      >
        {title}
      </TitleTag>
      <ul
        className={cn(
          'w-full',
          'grid grid-cols-2 gap-4',
          'xs:grid-cols-1',
          'sm:grid-cols-3 sm:gap-x-[1.875rem] sm:gap-y-6',
          'lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8'
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
    </section>
  );
};
