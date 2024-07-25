import { IconComponentType, MediaTypeMovie, MediaTypeTV } from '@/components/app-specific/Icon';
import { MediaType } from '@/types/medias';

export const MEDIA_TYPE_MAP: Record<MediaType, { icon: IconComponentType; label: string }> = {
  movie: {
    icon: MediaTypeMovie,
    label: 'Movie',
  },
  tv: {
    icon: MediaTypeTV,
    label: 'TV Series',
  },
};
