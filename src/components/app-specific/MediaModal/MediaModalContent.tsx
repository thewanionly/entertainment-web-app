import { useState } from 'react';

import useSWR from 'swr';

import { fetchMovieDetails } from '@/services/medias/fetchMovieDetails';
import { MediaCardType } from '@/types/medias';

import { MediaModalDetails } from './MediaModalDetails';
import { MediaModalImage } from './MediaModalImage';
import { MediaModalVideo } from './MediaModalVideo';

type MediaModalContentProps = {
  data: MediaCardType;
  isMobile?: boolean;
};

export const MediaModalContent = ({ data, isMobile = false }: MediaModalContentProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const { id, title, imagePath } = data;

  const { data: mediaDetails, isLoading } = useSWR(id.toString(), (id: string) =>
    fetchMovieDetails(Number(id))
  );

  const { src: videoSrc } = mediaDetails?.video ?? {};
  const hasVideo = Boolean(!isLoading && videoSrc);

  const handleShowVideo = () => setShowVideo(true);

  return (
    <>
      {showVideo && videoSrc ? (
        <MediaModalVideo videoSrc={videoSrc} videoName={title} />
      ) : (
        <MediaModalImage imagePath={imagePath} title={title} />
      )}
      <MediaModalDetails
        data={data}
        isMobile={isMobile}
        hasVideo={hasVideo}
        isMediaLoading={isLoading}
        handleShowVideo={handleShowVideo}
      />
    </>
  );
};
