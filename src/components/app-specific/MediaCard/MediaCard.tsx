import { ReactNode } from 'react';

import Image from 'next/image';

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
  title?: string;
};

export const MediaCard = ({ className = '', children }: MediaCardProps) => {
  return <div className={cn('', className)}>{children}</div>;
};

const MediaCardImage = ({ className = '', src, alt, title }: MediaCardImageProps) => (
  <div className={cn('relative h-5 w-[25px]', className)}>
    <Image className="rounded-lg" src={src} alt={alt} title={title} fill />
  </div>
);

const MediaCardDetails = ({ className = '', title }: MediaCardDetailsProps) => (
  <div className={cn('', className)}>
    <div className="flex gap-2"></div>
    <p className="text-white">{title}</p>
  </div>
);

MediaCard.Image = MediaCardImage;
MediaCard.Details = MediaCardDetails;
