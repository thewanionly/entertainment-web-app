import { ImageLoaderProps } from 'next/image';

import { IMAGE_BASE_URL, IMAGE_POSTER_SIZES } from '@/constants/images';

const imageLoader = ({ src, width }: ImageLoaderProps) => {
  const imagePosterSizes = IMAGE_POSTER_SIZES.filter((v) => v !== 'original').map((v) =>
    Number(v.replace(/^w+/, ''))
  );
  let imageWidth = width > imagePosterSizes[imagePosterSizes.length - 1] && 'original';

  // find closest width
  let closest = imagePosterSizes[0];
  let minDiff = Math.abs(closest - width);

  for (const size of imagePosterSizes) {
    const diff = Math.abs(size - width);
    if (diff < minDiff) {
      closest = size;
      minDiff = diff;
    }
  }

  if (!imageWidth) imageWidth = `w${closest}`;

  return `${IMAGE_BASE_URL}${imageWidth}${src}`;
};

export default imageLoader;
