import { Fragment, forwardRef } from 'react';

import { MEDIA_TYPE_MAP } from '@/constants/medias/mediaType';
import { MediaType } from '@/types/medias';
import { cn } from '@/utils/styles';

import { MediaCardDotSeparator } from './MediaCardDotSeparator';

type MediaCardDetailsProps = {
  className?: string;
  title: string;
  year?: string;
  mediaType: MediaType;
  rating?: string;
};

type UpperDetailsProps = Pick<MediaCardDetailsProps, 'year' | 'mediaType' | 'rating'>;

const UpperDetails = ({ year, mediaType, rating }: UpperDetailsProps) => {
  const { icon: MediaTypeIcon, label: mediaTypeLabel } = MEDIA_TYPE_MAP[mediaType];

  const upperDetailsElements = [
    year && <span key={0}>{year}</span>,
    <span
      key={1}
      className={cn('mediaType-container', 'flex items-center gap-1 capitalize sm:gap-1.5')}
    >
      <MediaTypeIcon
        className={cn('mediaType-icon', 'w-2.5 sm:w-3', mediaType === MediaType.TV && '-mt-0.5')}
        title={mediaTypeLabel}
      />
      {mediaTypeLabel}
    </span>,
    rating && (
      <span key={2} className="truncate">
        {rating}
      </span>
    ),
  ];

  return (
    <div
      className={cn(
        'upper-details-container',
        'flex items-center gap-[7.5px] text-[11px] font-light leading-[normal] text-white/75',
        'sm:gap-2 sm:text-body-s'
      )}
    >
      {upperDetailsElements
        .filter((upperDetailEl) => upperDetailEl)
        .map((upperDetailEl, index, elements) => (
          <Fragment key={(upperDetailEl as JSX.Element).key}>
            {upperDetailEl}
            {index < elements.length - 1 && <MediaCardDotSeparator />}
          </Fragment>
        ))}
    </div>
  );
};

export const MediaCardDetails = forwardRef<HTMLButtonElement, MediaCardDetailsProps>(
  ({ className = '', title, year, mediaType, rating }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1 sm:gap-[0.3125rem]', className)}>
        <UpperDetails year={year} mediaType={mediaType} rating={rating} />
        <p
          className={cn(
            'title',
            'truncate text-[0.875rem] font-medium leading-[normal] text-white sm:text-heading-xs'
          )}
          title={title}
        >
          <button
            ref={ref}
            className={cn(
              'primary-action',
              'w-full truncate text-start focus-visible:outline-none',
              'before:absolute before:inset-0 before:z-10 before:cursor-pointer before:rounded-sm',
              'focus-visible:before:outline focus-visible:before:outline-1 focus-visible:before:outline-offset-4 focus-visible:before:outline-white'
            )}
          >
            {title}
          </button>
        </p>
      </div>
    );
  }
);

MediaCardDetails.displayName = 'MediaCardDetails';
