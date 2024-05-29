import { render, screen } from '@/tests/utils';

import { TrendingSection } from './TrendingSection';
import { TRENDING_SECTION_HEADING, mockedTrendingData } from './TrendingSection.constants';

describe('TrendingSection', () => {
  it('displays section heading', () => {
    render(<TrendingSection medias={mockedTrendingData} />);

    const sectionHeading = screen.getByText(TRENDING_SECTION_HEADING);

    expect(sectionHeading).toBeInTheDocument();
  });

  it('displays carousel items', () => {
    render(<TrendingSection medias={mockedTrendingData} />);

    const carouselItems = screen.getAllByTestId('carousel-item');

    expect(carouselItems).toHaveLength(mockedTrendingData.length);
  });
});
