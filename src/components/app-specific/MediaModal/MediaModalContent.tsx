import useSWR from 'swr';

import { fetchMovieDetails } from '@/services/medias/fetchMovieDetails';
import { MediaCardType } from '@/types/medias';

import { MediaModalDetails } from './MediaModalDetails';
import { MediaModalImage } from './MediaModalImage';

type MediaModalContentProps = {
  data: MediaCardType;
  isMobile?: boolean;
};

export const MediaModalContent = ({ data, isMobile = false }: MediaModalContentProps) => {
  const { id, title, imagePath } = data;

  const { data: mediaDetails, isLoading } = useSWR(id.toString(), (id: string) =>
    fetchMovieDetails(Number(id))
  );

  const { src: videoSrc } = mediaDetails?.video ?? {};

  return (
    <>
      <MediaModalImage imagePath={imagePath} title={title} />
      <MediaModalDetails
        data={data}
        isMobile={isMobile}
        videoSrc={videoSrc}
        isMediaLoading={isLoading}
      />
    </>
  );
};
