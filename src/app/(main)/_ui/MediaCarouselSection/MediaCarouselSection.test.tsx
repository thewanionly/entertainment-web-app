import { render, screen } from '@/tests/utils';

import { MediaCarouselSection } from './MediaCarouselSection';
import { mockedTitle, mockedMedias } from './MediaCarouselSection.constants';

describe('MediaCarouselSection', () => {
  it('displays section heading', () => {
    render(<MediaCarouselSection title={mockedTitle} medias={mockedMedias} />);

    const sectionHeading = screen.getByText(mockedTitle);

    expect(sectionHeading).toBeInTheDocument();
  });

  it('displays carousel items', () => {
    render(<MediaCarouselSection title={mockedTitle} medias={mockedMedias} />);

    const carouselItems = screen.getAllByTestId('carousel-item');

    expect(carouselItems).toHaveLength(mockedMedias.length);
  });
});
