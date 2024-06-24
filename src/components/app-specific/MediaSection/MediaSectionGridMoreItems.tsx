'use client';

import { useEffect, useRef, useState } from 'react';

import { useInView } from 'framer-motion';

import { MediaSectionGridItems } from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MAX_PAGE, MIN_PAGE } from '@/constants/medias';
import { useSearchParams } from '@/lib/navigation';
import { Media } from '@/types/medias';

type MediaSectionGridMoreItemsProps = {
  totalPages?: number;
  loadMoreFn: (params: { page: number; searchTerm?: string }) => Promise<Media[]>;
};

const INFINITY_SCROLL_EL_TOP_MARGIN = '40px';

export const MediaSectionGridMoreItems = ({
  totalPages,
  loadMoreFn,
}: MediaSectionGridMoreItemsProps) => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [page, setPage] = useState(MIN_PAGE);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q')?.toString() ?? '';

  const infScrollElRef = useRef(null);
  const isInfScrollElInView = useInView(infScrollElRef, { margin: INFINITY_SCROLL_EL_TOP_MARGIN });
  const hasMoreMedias = (!totalPages || page < totalPages) && page < MAX_PAGE;
  const shouldLoadMore = isInfScrollElInView && hasMoreMedias;

  useEffect(() => {
    if (!shouldLoadMore) return;

    setPage((prevPage) => prevPage + 1);
  }, [shouldLoadMore]);

  useEffect(() => {
    if (page <= MIN_PAGE) return;

    (async () => {
      const newMedias = await loadMoreFn({ page, searchTerm });

      setMedias((currentMedias) => [...currentMedias, ...newMedias]);
    })();
  }, [page, loadMoreFn, searchTerm]);

  return (
    <>
      <MediaSectionGridItems medias={medias} />
      {/* Indicator element when to load more medias. If the user scrolls to this element which is plaed in the bottom, load more medias. */}
      {hasMoreMedias && <div ref={infScrollElRef} className="invisible" />}
    </>
  );
};
