import Image, { ImageProps } from 'next/image';

import imageLoader from '@/utils/images';
import { cn } from '@/utils/styles';

type MediaCardImageProps = ImageProps & {
  className?: string;
};

export const MediaCardImage = ({ className = '', alt, ...props }: MediaCardImageProps) => {
  return (
    <div className={cn('relative h-full w-full', className)}>
      <Image
        className={cn('image', 'rounded-lg object-cover')}
        loader={imageLoader}
        alt={alt}
        fill
        {...props}
      />
    </div>
  );
};
