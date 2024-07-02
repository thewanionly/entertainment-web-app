import Image, { ImageProps } from 'next/image';

import { IMAGE_PLACEHOLDER } from '@/constants/images';
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
        className={cn('image', 'rounded-lg', src ? 'object-cover' : 'bg-grey/50 object-contain')}
        src={imgSrc}
        loader={imgLoader}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={IMAGE_PLACEHOLDER} // TODO: generate dynamic blurDataURL per image
        {...props}
      />
    </div>
  );
};
