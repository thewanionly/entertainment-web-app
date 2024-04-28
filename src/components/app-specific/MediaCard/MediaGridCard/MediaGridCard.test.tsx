import { composeStories, render, screen, userEvent, waitFor, within } from '@/tests/utils';

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

    const category = new RegExp(Default.args.category as string, 'i');
    const categoryEl = screen.getByText(category);
    const categoryIcon = within(categoryEl).getByTitle(category);

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

    const bookmarkBtn = screen.getByRole('button', { name: /bookmark/i });

    expect(bookmarkBtn).toBeInTheDocument();
  });

  it(`displays play button when image is hovered`, async () => {
    render(<Default isHoverable />);

    const mediaCard = screen.getByTestId('media-card-image');

    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument();

    await userEvent.hover(mediaCard);

    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it(`hides play button when bookmark icon button is hovered`, async () => {
    render(<Default isHoverable />);

    // hover image to display play button
    const mediaCard = screen.getByTestId('media-card-image');
    await userEvent.hover(mediaCard);
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();

    // hover bookmark icon button to hide play button
    const bookmarkBtn = screen.getByRole('button', { name: /bookmark/i });
    await userEvent.hover(bookmarkBtn);
    await waitFor(() =>
      // need to wrap with waitFor due to AnimatePresence
      expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument()
    );
  });
});
