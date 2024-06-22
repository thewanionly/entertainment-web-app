'use client';

import { useState } from 'react';

import { MediaSectionGrid } from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { Button } from '@/components/generic/Button';
import { MAX_PAGE, MIN_PAGE } from '@/constants/medias';
import { useSearchParams } from '@/lib/navigation';
import { Media } from '@/types/medias';

type MediaSearchPageMediaSectionGridProps = {
  initialMedias: Media[];
  totalPages?: number;
  loadMoreMediaSearchResults: (searchTerm: string, page: number) => Promise<Media[]>;
};

export const MediaSearchPageMediaSectionGrid = ({
  initialMedias,
  totalPages,
  loadMoreMediaSearchResults,
}: MediaSearchPageMediaSectionGridProps) => {
  const [medias, setMedias] = useState(initialMedias);
  const [page, setPage] = useState(MIN_PAGE);
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('q')?.toString() ?? '';
  const hasMoreMediasToLoad = (!totalPages || page < totalPages) && page < MAX_PAGE;

  const handleLoadMore = async () => {
    const newPage = page + 1;

    const newMedias = await loadMoreMediaSearchResults(searchTerm, newPage);

    setPage(newPage);
    setMedias((currentMedias) => [...currentMedias, ...newMedias]);
  };

  return (
    <>
      <MediaSectionGrid medias={medias} />
      {hasMoreMediasToLoad && (
        <div className="mt-20 flex w-full justify-center">
          <Button onClick={handleLoadMore}>Load more</Button>
        </div>
      )}
    </>
  );
};
