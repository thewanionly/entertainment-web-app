import { ReactNode } from 'react';

import Image from 'next/image';

import {
  BookMarkEmpty,
  BookMarkFull,
  CategoryMovie,
  CategoryTV,
} from '@/components/app-specific/Icon';
import { IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import { MediaCategory } from './MediaCard.types';

type MediaCardProps = {
  className?: string;
  children: ReactNode;
  isBookmarked?: boolean;
};

type MediaCardImageProps = {
  src: string;
  alt: string;
  title?: string;
  className?: string;
};

type MediaCardDetailsProps = {
  className?: string;
  title: ReactNode;
  year: string;
  category: MediaCategory;
  rating: string;
};

type MediaCardBookMarkIconProps = {
  className?: string;
  isActive?: boolean;
};

const MEDIA_CATEGORY_ICON = {
  movie: CategoryMovie,
  tv_series: CategoryTV,
};

export const MediaCard = ({ className = '', children, isBookmarked = false }: MediaCardProps) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      <MediaCardBookMarkIcon
        className={cn(
          'absolute right-2 top-2',
          'h-8 w-8 rounded-full bg-dark-blue/50 p-0 text-white hover:bg-dark-blue/50',
          'hover:bg-white hover:text-dark-blue'
        )}
        isActive={isBookmarked}
      />
    </div>
  );
};

const MediaCardImage = ({ className = '', src, alt, title }: MediaCardImageProps) => (
  <div className={cn('relative h-5 w-[25px]', className)}>
    <Image className="rounded-lg" src={src} alt={alt} title={title} fill />
  </div>
);

const MediaCardDetails = ({
  className = '',
  title,
  year,
  category,
  rating,
}: MediaCardDetailsProps) => {
  const CategoryIcon = MEDIA_CATEGORY_ICON[category];

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-center gap-[7.5px]">
        <span className="text-[11px] font-light text-white/75">{year}</span>
        <span className="h-0.5 w-0.5 rounded-full bg-white/50" />
        <span className="flex items-center gap-1 text-[11px] font-light capitalize text-white/75">
          <CategoryIcon className="w-2.5" title={category} />
          {category}
        </span>
        <span className="h-0.5 w-0.5 rounded-full bg-white/50" />
        <span className="text-[11px] font-light text-white/75">{rating}</span>
      </div>
      <p className="text-[14px] font-medium text-white">{title}</p>
    </div>
  );
};

const MediaCardBookMarkIcon = ({
  className = '',
  isActive = false,
}: MediaCardBookMarkIconProps) => {
  const label = isActive ? 'Remove from bookmarked medias' : 'Add to bookmarked medias';

  return (
    <IconButton className={className} title={label}>
      {isActive ? (
        <BookMarkFull className="h-[14px] w-[12px]" title="bookmark full" />
      ) : (
        <BookMarkEmpty className="h-[14px] w-[12px]" title="bookmark empty" />
      )}
      <IconButtonSrLabel label={label} />
    </IconButton>
  );
};

MediaCard.Image = MediaCardImage;
MediaCard.Details = MediaCardDetails;
