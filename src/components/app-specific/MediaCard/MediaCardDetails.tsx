import { Fragment } from 'react';

import { cn } from '@/utils/styles';

import { CategoryMovie, CategoryTV } from '../Icon';
import { MediaCategory } from './MediaCard.types';

type MediaCardDetailsProps = {
  className?: string;
  title: string;
  year: string;
  category: MediaCategory;
  rating?: string;
};

type UpperDetailsProps = Pick<MediaCardDetailsProps, 'year' | 'category' | 'rating'>;

const MEDIA_CATEGORY_MAP = {
  movie: {
    icon: CategoryMovie,
    label: 'Movie',
  },
  tv_series: {
    icon: CategoryTV,
    label: 'TV Series',
  },
  tv: {
    icon: CategoryTV,
    label: 'TV Series',
  },
};

const UpperDetails = ({ year, category, rating }: UpperDetailsProps) => {
  const { icon: CategoryIcon, label: categoryName } = MEDIA_CATEGORY_MAP[category];

  const upperDetailsElements = [
    <span key={0}>{year}</span>,
    <span
      key={1}
      className={cn('category-container', 'flex items-center gap-1 capitalize sm:gap-1.5')}
    >
      <CategoryIcon className={cn('category-icon', 'w-2.5 sm:w-3')} title={categoryName} />
      {categoryName}
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
            {index < elements.length - 1 && (
              <span
                className={cn(
                  'dot-separator',
                  'h-0.5 w-0.5 flex-shrink-0 rounded-full bg-white/50',
                  'sm:h-[3px] sm:w-[3px]'
                )}
              />
            )}
          </Fragment>
        ))}
    </div>
  );
};

export const MediaCardDetails = ({
  className = '',
  title,
  year,
  category,
  rating,
}: MediaCardDetailsProps) => {
  return (
    <div className={cn('flex flex-col gap-1 sm:gap-[5px]', className)}>
      <UpperDetails year={year} category={category} rating={rating} />
      <p
        className={cn(
          'title',
          'truncate text-[14px] font-medium leading-[normal] text-white sm:text-heading-xs'
        )}
      >
        {title}
      </p>
    </div>
  );
};
