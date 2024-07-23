import { cn } from '@/utils/styles';

import { MediaCardImage } from '../MediaCard/MediaCardImage';

export const MediaModalImage = ({ imagePath, title }: { imagePath: string; title: string }) => (
  <MediaCardImage
    className={cn(
      'aspect-[2] h-[unset] w-full',
      'rounded-b-none rounded-t-md',
      'after:absolute after:-bottom-0.5 after:left-0 after:h-[25%] after:w-full after:bg-gradient-to-b after:from-dark-blue/0 after:to-dark-blue/100'
    )}
    src={imagePath}
    alt={title}
  />
);
