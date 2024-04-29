import { cn } from '@/utils/styles';

import { MediaCard, MediaCardImage } from '../MediaCard';

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
    <MediaCard className={cn('relative', className)}>
      <MediaCardImage
        className={cn(
          'h-[140px] w-[240px]',
          'md:h-[230px] md:w-[470px]',
          'xl:h-[230px] xl:w-[470px]'
        )}
        src={imgSrc}
        alt={imgAlt}
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 61vw, 64vw"
      />

      {/* <MediaCard.Details className="absolute bottom-[16px] left-[16px]" title={title} /> */}
    </MediaCard>
  );
};
