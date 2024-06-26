import { composeStories, render, screen, userEvent, waitFor, within } from '@/tests/utils';

import * as MediaCarouselCard from './MediaCarouselCard.stories';

const { Default, TouchDevice } = composeStories(MediaCarouselCard);

describe('MediaCarouselCard', () => {
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

    const mediaType = new RegExp(Default.args.mediaType as string, 'i');
    const mediaTypeEl = screen.getByText(mediaType);
    const mediaTypeIcon = within(mediaTypeEl).getByTitle(mediaType);

    expect(mediaTypeEl).toBeInTheDocument();
    expect(mediaTypeIcon).toBeInTheDocument();
  });

  it(`displays media rating`, () => {
    render(<Default />);

    const ratingEl = screen.getByText(Default.args.rating as string);

    expect(ratingEl).toBeInTheDocument();
  });

  // TODO: add back when implementing bookmark functionality
  xit(`displays bookmark icon button`, () => {
    render(<Default />);

    const bookmarkBtn = screen.getByRole('button', { name: /bookmark/i });

    expect(bookmarkBtn).toBeInTheDocument();
  });

  // TODO: add back when implementing play trailer functionality
  xit(`displays play button when image is hovered in non-touch devices`, async () => {
    render(<Default isHoverable />);

    const mediaCard = screen.getByTestId('media-card-hoverable-area');

    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument();

    await userEvent.hover(mediaCard);

    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  //  TODO: add back when implementing bookmark functionality
  xit(`hides play button when bookmark icon button is hovered in non-touch devices`, async () => {
    render(<Default isHoverable />);

    // hover image to display play button
    const mediaCard = screen.getByTestId('media-card-hoverable-area');
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

  // TODO: add back when implementing play trailer functionality
  xit('shows a persistent play button on touch devices', () => {
    render(<TouchDevice />);

    const playBtn = screen.getByRole('button', { name: /play/i });

    expect(playBtn).toBeInTheDocument();
  });
});
