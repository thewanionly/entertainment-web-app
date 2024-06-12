'use client';

import { Fragment, ReactNode } from 'react';

import Link from 'next/link';

import { MediaCarousel } from '@/components/app-specific/MediaCarousel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Media } from '@/types/medias';
import { cn } from '@/utils/styles';

type MediaCarouselSectionProps = {
  className?: string;
  title: string;
  titleLink?: string;
  medias: Media[];
};

const SLIDES_TO_SCROLL_LG = 2;
const SLIDES_TO_SCROLL_DEFAULT = 1;

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
}: MediaCarouselSectionProps) => {
  const lg = useMediaQuery('(min-width: 1024px)');

  return (
    <section className={cn('ml-auto w-[95.735%] overflow-hidden lg:w-full lg:pl-9', className)}>
      <TitleWrapper href={titleLink}>
        <h2
          className={cn(
            'inline-block capitalize',
            'mb-4 text-[1.25rem] font-light leading-[normal] tracking-[-0.019375rem]',
            'mb-[1.5625rem] sm:text-heading-l'
          )}
        >
          {title}
        </h2>
      </TitleWrapper>
      <MediaCarousel
        items={medias}
        slidesToScroll={lg ? SLIDES_TO_SCROLL_LG : SLIDES_TO_SCROLL_DEFAULT}
      />
    </section>
  );
};
