import Image, { ImageProps } from 'next/image';

import imageLoader from '@/utils/images';
import { cn } from '@/utils/styles';

type MediaCardImageProps = ImageProps & {
  className?: string;
};

export const MediaCardImage = ({
  className = '',
  src,
  alt,
  loader,
  ...props
}: MediaCardImageProps) => {
  const imgSrc = src || '/images/no-image-placeholder.svg';
  const imgLoader = src ? loader || imageLoader : undefined;

  return (
    <div className={cn('relative h-full w-full', className)}>
      <Image
        className={cn('image', 'rounded-lg', src ? 'object-cover' : 'bg-light-grey object-contain')}
        src={imgSrc}
        loader={imgLoader}
        alt={alt}
        fill
        {...props}
      />
    </div>
  );
};
