'use client';

import { useEffect, useRef, useState } from 'react';

import { useInView } from 'framer-motion';

import { MediaSectionGridItems } from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MAX_PAGE, MIN_PAGE } from '@/constants/medias';
import { Media } from '@/types/medias';

type MediaPageMoreItemsProps = {
  totalPages?: number;
  loadMoreMedias: (page: number) => Promise<Media[]>;
};
export const MediaPageMoreItems = ({ totalPages, loadMoreMedias }: MediaPageMoreItemsProps) => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [page, setPage] = useState(MIN_PAGE);

  const infScrollElRef = useRef(null);
  const isInfScrollElInView = useInView(infScrollElRef, { margin: '40px' });
  const hasMoreMedias = (!totalPages || page < totalPages) && page < MAX_PAGE;
  const shouldLoadMore = isInfScrollElInView && hasMoreMedias;

  useEffect(() => {
    if (!shouldLoadMore) return;

    setPage((prevPage) => prevPage + 1);
  }, [shouldLoadMore]);

  useEffect(() => {
    if (page <= MIN_PAGE) return;

    (async () => {
      const newMedias = await loadMoreMedias(page);

      setMedias((currentMedias) => [...currentMedias, ...newMedias]);
    })();
  }, [page, loadMoreMedias]);

  return (
    <>
      <MediaSectionGridItems medias={medias} />
      {/* Indicator element when to load more medias. If the user scrolls to this element which is plaed in the bottom, load more medias. */}
      {hasMoreMedias && <div ref={infScrollElRef} className="invisible" />}
    </>
  );
};
