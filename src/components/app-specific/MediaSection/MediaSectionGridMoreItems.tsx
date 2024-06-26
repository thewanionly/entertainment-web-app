'use client';

import { useEffect, useRef, useState } from 'react';

import { useInView } from 'framer-motion';

import { MediaGridCardSkeleton } from '@/components/app-specific/MediaCard/MediaGridCard/MediaGridCardSkeleton';
import { MediaSectionGridItems } from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MAX_PAGE, MIN_PAGE } from '@/constants/medias';
import { useIsInClient } from '@/hooks/useIsInClient';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Media } from '@/types/medias';

type MediaSectionGridMoreItemsProps = {
  totalPages?: number;
  loadMoreFn: (page: number) => Promise<Media[]>;
};

const INFINITY_SCROLL_EL_TOP_MARGIN = '240px';
const SKELETON_NUM_SM = 4;
const SKELETON_NUM_DEFAULT = 2;

export const MediaSectionGridMoreItems = ({
  totalPages,
  loadMoreFn,
}: MediaSectionGridMoreItemsProps) => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [page, setPage] = useState(MIN_PAGE);

  const infScrollElRef = useRef(null);
  const isInfScrollElInView = useInView(infScrollElRef, { margin: INFINITY_SCROLL_EL_TOP_MARGIN });
  const hasMoreMedias = (!totalPages || page < totalPages) && page < MAX_PAGE;
  const shouldLoadMore = isInfScrollElInView && hasMoreMedias;

  const isInClient = useIsInClient();
  const sm = useMediaQuery('(min-width: 640px)');
  const skeletonCardsNum = sm ? SKELETON_NUM_SM : SKELETON_NUM_DEFAULT;

  useEffect(() => {
    if (!shouldLoadMore) return;

    setPage((prevPage) => prevPage + 1);
  }, [shouldLoadMore]);

  useEffect(() => {
    if (page <= MIN_PAGE) return;

    (async () => {
      const newMedias = await loadMoreFn(page);

      setMedias((currentMedias) => [...currentMedias, ...newMedias]);
    })();
  }, [page, loadMoreFn]);

  return (
    <>
      <MediaSectionGridItems medias={medias} />

      {/* Indicator element when to load more medias. If the user scrolls to this element which is plaed in the bottom, load more medias. */}
      {hasMoreMedias && (
        <div ref={infScrollElRef} className="invisible absolute bottom-0 left-0 size-10" />
      )}

      {isInClient &&
        hasMoreMedias &&
        Array.from({ length: skeletonCardsNum }, (_, index) => (
          <li key={index}>
            <MediaGridCardSkeleton />
          </li>
        ))}
    </>
  );
};
