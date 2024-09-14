import { useState } from 'react';

import useSWR from 'swr';

import { fetchMovieDetails } from '@/services/medias/fetchMovieDetails';
import { fetchTvDetails } from '@/services/medias/fetchTvDetails';
import { MediaCardType, MediaType } from '@/types/medias';

import { MediaModalDetails } from './MediaModalDetails';
import { MediaModalImage } from './MediaModalImage';
import { MediaModalVideo } from './MediaModalVideo';

type MediaModalContentProps = {
  data: MediaCardType;
  isMobile?: boolean;
};

const mediaDetailsFetcher = (mediaType: MediaType) => (id: string) => {
  if (mediaType === MediaType.MOVIE) {
    return fetchMovieDetails(Number(id));
  }

  if (mediaType === MediaType.TV) {
    return fetchTvDetails(Number(id));
  }

  throw new Error(`Invalid ${mediaType}`);
};

export const MediaModalContent = ({ data, isMobile = false }: MediaModalContentProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const { id, title, imagePath } = data;

  const { data: mediaDetails, isLoading } = useSWR(
    id.toString(),
    mediaDetailsFetcher(data.mediaType)
  );

  const { src: videoSrc } = mediaDetails?.video ?? {};
  const hasVideo = Boolean(!isLoading && videoSrc);

  const handleShowVideo = () => setShowVideo(true);
  const handleHideVideo = () => setShowVideo(false);

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
        showVideo={showVideo}
        handleShowVideo={handleShowVideo}
        handleHideVideo={handleHideVideo}
      />
    </>
  );
};
