import { composeStories, render, screen } from '@/tests/utils';

import * as NavigationStories from './Navigation.stories';

const { TextLinks, IconLinks } = composeStories(NavigationStories);

describe('Navigation', () => {
  it('renders text links', () => {
    render(<TextLinks />);

    const anchorElements = screen.getAllByRole('link');

    expect(anchorElements.length).toBeGreaterThan(0);
  });

  // TODO: fix errors caused by dynamic icons
  xit('renders icon links', () => {
    render(<IconLinks />);

    const anchorElements = screen.getAllByRole('link');

    expect(anchorElements.length).toBeGreaterThan(0);

    anchorElements.forEach((anchorElement) => {
      expect(anchorElement.querySelector('svg')).toBeInTheDocument();
    });
  });
});
