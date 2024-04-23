import { composeStories, render, screen, userEvent, within } from '@/tests/utils';

import * as MediaGridCard from './MediaGridCard.stories';

const { Default } = composeStories(MediaGridCard);

describe('MediaGridCard', () => {
  it('displays media thumbnail image', () => {
    render(<Default />);

    const imgEl = screen.getByAltText(Default.args.imgAlt as string);

    expect(imgEl).toHaveAttribute('src', Default.args.imgSrc);
  });

  it('displays media title', () => {
    render(<Default />);

    const titleEl = screen.getByText(Default.args.title as string);

    expect(titleEl).toBeInTheDocument();
  });

  it(`displays media's release year`, () => {
    render(<Default />);

    const yearEl = screen.getByText(Default.args.year as string);

    expect(yearEl).toBeInTheDocument();
  });

  it(`displays media type`, () => {
    render(<Default />);

    const categoryEl = screen.getByText(Default.args.category as string);
    const categoryIcon = within(categoryEl).getByTitle(Default.args.category as string);

    expect(categoryEl).toBeInTheDocument();
    expect(categoryIcon).toBeInTheDocument();
  });

  it(`displays media rating`, () => {
    render(<Default />);

    const ratingEl = screen.getByText(Default.args.rating as string);

    expect(ratingEl).toBeInTheDocument();
  });

  it(`displays bookmark icon button`, () => {
    render(<Default />);

    const bookmarkBtn = screen.getByRole('button', { name: 'Add to bookmarked medias' });
    const bookmarkIcon = within(bookmarkBtn).getByTitle(/bookmark/);

    expect(bookmarkBtn).toBeInTheDocument();
    expect(bookmarkIcon).toBeInTheDocument();
  });

  it(`displays play button when hovered`, async () => {
    render(<Default />);

    const mediaCard = screen.getByTestId('media-card-image');

    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument();

    await userEvent.hover(mediaCard);

    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });
});
