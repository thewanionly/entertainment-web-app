import { Fragment, ReactNode } from 'react';

import Link from 'next/link';

import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import { MediaSectionCarousel } from '@/components/app-specific/MediaSection/MediaSectionCarousel';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';
import { CarouselOptions } from '@/components/generic/Carousel';
import { MediaCardType } from '@/types/medias';
import { cn } from '@/utils/styles';

type MediaCarouselSectionProps = {
  className?: string;
  title: string;
  titleLink?: string;
  medias: MediaCardType[];
  carouselOptions?: CarouselOptions;
};

const TitleWrapper = ({ href, children }: { href?: string; children: ReactNode }) => {
  if (!href) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Link href={href} className="hover:text-red/90 motion-safe:transition-colors">
      {children}
    </Link>
  );
};

export const MediaCarouselSection = ({
  className = '',
  title,
  titleLink,
  medias,
  carouselOptions,
}: MediaCarouselSectionProps) => {
  return (
    <MediaSection className={cn('ml-auto mr-0 w-[95.735%] lg:px-0 lg:pl-9', className)}>
      <TitleWrapper href={titleLink}>
        <MediaSectionTitle className="mb-4 sm:mb-[1.5625rem] sm:text-heading-l">
          {title}
        </MediaSectionTitle>
      </TitleWrapper>
      <MediaSectionCarousel medias={medias} options={carouselOptions} />
    </MediaSection>
  );
};
