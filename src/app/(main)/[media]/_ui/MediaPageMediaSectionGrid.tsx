'use client';

import { useState } from 'react';

import { MediaSectionGrid } from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { Button } from '@/components/generic/Button';
import { DEFAULT_PAGE } from '@/constants/medias';
import { Media } from '@/types/medias';

type MediaPageMediaSectionGridProps = {
  initialMedias: Media[];
  loadMoreMedias: (page: number) => Promise<Media[]>;
};
export const MediaPageMediaSectionGrid = ({
  initialMedias,
  loadMoreMedias,
}: MediaPageMediaSectionGridProps) => {
  const [medias, setMedias] = useState(initialMedias);
  const [page, setPage] = useState(DEFAULT_PAGE);

  const handleLoadMore = async () => {
    const newPage = page + 1;

    const newMedias = await loadMoreMedias(newPage);

    setPage(newPage);
    setMedias((currentMedias) => [...currentMedias, ...newMedias]);
  };

  return (
    <>
      <MediaSectionGrid medias={medias} />
      <div className="mt-20 flex w-full justify-center">
        <Button onClick={handleLoadMore}>Load more</Button>
      </div>
    </>
  );
};
