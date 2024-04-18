import { composeStories, render, screen } from '@/tests/utils';

import * as MediaSliderCard from './MediaSliderCard.stories';

const { Default } = composeStories(MediaSliderCard);

describe('MediaSliderCard', () => {
  it('displays media thumbnail image', () => {
    render(<Default />);

    const imgEl = screen.getByAltText(Default.args.imgAlt as string);

    expect(imgEl).toHaveAttribute('src', Default.args.imgSrc);
  });
});
