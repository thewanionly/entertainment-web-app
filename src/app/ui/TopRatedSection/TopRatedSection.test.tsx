import { render, screen } from '@/tests/utils';

import { TopRatedSection } from './TopRatedSection';
import { TOP_RATED_SECTION_HEADING, mockedTopRatedData } from './TopRatedSection.constants';

describe('TopRatedSection', () => {
  it('displays section heading', () => {
    render(<TopRatedSection medias={mockedTopRatedData} />);

    const sectionHeading = screen.getByText(TOP_RATED_SECTION_HEADING);

    expect(sectionHeading).toBeInTheDocument();
  });

  it('displays grid items', () => {
    render(<TopRatedSection medias={mockedTopRatedData} />);

    const gridItems = screen.getAllByTestId('grid-item');

    expect(gridItems).toHaveLength(mockedTopRatedData.length);
  });
});
