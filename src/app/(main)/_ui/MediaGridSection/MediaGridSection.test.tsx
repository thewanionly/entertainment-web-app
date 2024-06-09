import { render, screen } from '@/tests/utils';

import { MediaGridSection } from './MediaGridSection';
import { mockedMedias, mockedTitle } from './MediaGridSection.constants';

describe('MediaGridSection', () => {
  it('displays section heading', () => {
    render(<MediaGridSection title={mockedTitle} medias={mockedMedias} />);

    const sectionHeading = screen.getByText(mockedTitle);

    expect(sectionHeading).toBeInTheDocument();
  });

  it('displays grid items', () => {
    render(<MediaGridSection title={mockedTitle} medias={mockedMedias} />);

    const gridItems = screen.getAllByTestId('grid-item');

    expect(gridItems).toHaveLength(mockedMedias.length);
  });
});
