import { cn } from '@/utils/styles';

import { MediaCard, MediaCardBookMarkIconButton, MediaCardImage } from '../MediaCard';

type MediaCarouselCardProps = {
  className?: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
};

export const MediaCarouselCard = ({
  className = '',
  imgSrc,
  imgAlt,
  // title,
}: MediaCarouselCardProps) => {
  return (
    <MediaCard
      className={cn(
        'relative grid',
        'h-[140px] w-[240px]',
        'md:h-[230px] md:w-[470px]',
        'xl:h-[230px] xl:w-[470px]',
        className
      )}
    >
      <MediaCardImage
        className={cn('col-start-1 row-start-1')}
        src={imgSrc}
        alt={imgAlt}
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 61vw, 64vw"
      />

      <MediaCardBookMarkIconButton
        className={cn(
          'col-start-1 row-start-1 mr-2 mt-2 justify-self-end md:mr-6 md:mt-4',
          'peer z-20'
        )}
      />

      {/* <MediaCard.Details className="absolute bottom-[16px] left-[16px]" title={title} /> */}
    </MediaCard>
  );
};
