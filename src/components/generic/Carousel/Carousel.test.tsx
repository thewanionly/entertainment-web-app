import { composeStories, render, screen } from '@/tests/utils';

import { NUM_OF_CAROUSEL_ITEMS } from './Carousel.constants';
import * as CarouselStories from './Carousel.stories';

const { Default } = composeStories(CarouselStories);

describe('Carousel', () => {
  it('renders carousel', () => {
    render(<Default />);

    const carouselItems = screen.getAllByTestId('carousel-item');

    expect(carouselItems.length).toBe(NUM_OF_CAROUSEL_ITEMS);
  });

  it('displays the previous button', () => {
    render(<Default />);

    const prevBtn = screen.getByRole('button', { name: /previous slide/i });

    expect(prevBtn).toBeInTheDocument();
  });

  it('displays the next button', () => {
    render(<Default />);

    const nextBtn = screen.getByRole('button', { name: /next slide/i });

    expect(nextBtn).toBeInTheDocument();
  });
});
