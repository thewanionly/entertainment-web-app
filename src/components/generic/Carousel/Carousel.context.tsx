import { useContext, createContext } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import { CarouselProps } from './Carousel.types';

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

export const CarouselContext = createContext<CarouselContextProps | null>(null);

export const useCarousel = () => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
};
