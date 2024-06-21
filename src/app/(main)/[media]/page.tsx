import { notFound } from '@/lib/navigation';

import { MediaGridSection } from '../_ui/MediaGridSection';
import { MEDIA_DATA, MediaPageType } from './_utils/media.constants';

type MediaPageProps = {
  params: {
    media: string;
  };
  searchParams?: {
    q?: string;
    page?: string;
  };
};

export default async function MediaPage({
  params: { media = '' },
  searchParams: { q: searchTerm = '', page } = {},
}: MediaPageProps) {
  // validate `media`
  if (!Object.keys(MEDIA_DATA).includes(media)) {
    notFound();
  }

  // media page
  const { title, mediaPromise, searchLabel, searchPromise } =
    MEDIA_DATA[media as unknown as MediaPageType] ?? {};

  if (searchTerm) {
    // movies search page
    const { results, totalResults } = await searchPromise(searchTerm);

    return (
      <MediaGridSection
        className="my-6 sm:my-[2.125rem]"
        title={`Found ${totalResults} ${searchLabel} results for ‘${searchTerm}’`}
        titleTag="p"
        titleClassName="normal-case"
        medias={results}
      />
    );
  }

  const medias = await mediaPromise({ page });

  return (
    <MediaGridSection
      className="my-6 sm:my-[2.125rem]"
      title={title}
      titleClassName="lg:mb-[2.375rem]"
      medias={medias}
    />
  );
}
