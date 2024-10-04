import { MediaCarouselSection } from '@/app/(main)/_ui/MediaCarouselSection';
import { MediaCardType } from '@/types/medias';

type MediaCarouselSectionWrapperProps = {
  fetcher: Promise<MediaCardType[]>;
  title: string;
  titleLink?: string;
};

export const MediaCarouselSectionWrapper = async ({
  fetcher,
  title,
}: MediaCarouselSectionWrapperProps) => {
  const results = await fetcher;

  return (
    <MediaCarouselSection
      title={title}
      // titleLink={link} TODO: disable link to media category pages for now
      medias={results ?? []}
    />
  );
};
