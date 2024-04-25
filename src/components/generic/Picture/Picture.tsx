import { forwardRef } from 'react';

import { ImageProps, getImageProps } from 'next/image';

import { cn } from '@/utils/styles';
import { Optional } from '@/utils/types';

type PictureProps = {
  className?: string;
  alt: string;
  commonImgProps?: Partial<ImageProps>;
  mobileImgProps: Optional<ImageProps, 'alt'>;
  tabletImgProps: Optional<ImageProps, 'alt'>;
  desktopImgProps: Optional<ImageProps, 'alt'>;
};

// Source: https://nextjs.org/docs/app/api-reference/components/image#art-direction
export const Picture = forwardRef<HTMLPictureElement, PictureProps>(
  (
    { className = '', alt, commonImgProps, mobileImgProps, tabletImgProps, desktopImgProps },
    ref
  ) => {
    const commonProps = { alt, fill: true, ...commonImgProps };

    const mobileImage = getImageProps({
      ...commonProps,
      ...mobileImgProps,
    });
    const tabletImage = getImageProps({
      ...commonProps,
      ...tabletImgProps,
    });
    const desktopImage = getImageProps({
      ...commonProps,
      ...desktopImgProps,
    });

    const { srcSet: mobile, ...rest } = mobileImage.props;
    const { srcSet: tablet } = tabletImage.props;
    const { srcSet: desktop } = desktopImage.props;

    return (
      <picture ref={ref} className={cn('relative block w-full', className)}>
        <source media="(min-width: 1280px)" srcSet={desktop} />
        <source media="(min-width: 768px)" srcSet={tablet} />
        <source media="(max-width: 768px)" srcSet={mobile} />
        <img alt={alt} {...rest} />
      </picture>
    );
  }
);

Picture.displayName = 'Picture';
