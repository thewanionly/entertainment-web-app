import { ReactNode } from 'react';

import Image from 'next/image';

import { CategoryMovie, CategoryTV } from '@/components/app-specific/Icon';
import { cn } from '@/utils/styles';

type MediaCardProps = {
  className?: string;
  children: ReactNode;
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
  category: 'movie' | 'tv_series';
  rating: string;
};

const MEDIA_CATEGORY_ICON = {
  movie: CategoryMovie,
  tv_series: CategoryTV,
};

export const MediaCard = ({ className = '', children }: MediaCardProps) => {
  return <div className={cn('', className)}>{children}</div>;
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

MediaCard.Image = MediaCardImage;
MediaCard.Details = MediaCardDetails;
