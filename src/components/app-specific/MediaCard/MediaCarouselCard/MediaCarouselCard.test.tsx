import { composeStories, render, screen } from '@/tests/utils';

import * as MediaCarouselCard from './MediaCarouselCard.stories';

const { Default } = composeStories(MediaCarouselCard);

describe('MediaCarouselCard', () => {
  it('displays media thumbnail image', () => {
    render(<Default />);

    const imgEl = screen.getByAltText(Default.args.imgAlt as string);

    expect(imgEl).toHaveAttribute('src', Default.args.imgSrc);
  });
});
