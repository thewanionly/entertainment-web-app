import { composeStories, render, screen, userEvent } from '@/tests/utils';

import * as HeaderNavigation from './HeaderNavigation.stories';

const { Default, Active } = composeStories(HeaderNavigation);

describe('HeaderNavigation', () => {
  // TODO: fix errors caused by dynamic icons
  xit('renders navigation icon links', () => {
    render(<Default />);

    const anchorElements = screen.getAllByRole('link');

    expect(anchorElements.length).toBeGreaterThan(0);

    anchorElements.forEach((anchorElement) => {
      expect(anchorElement.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('displays first icon link as default active link', () => {
    render(<Active />);

    const anchorElements = screen.getAllByRole('link');

    expect(anchorElements[0]).toHaveAccessibleName(/active/i);
  });

  it('can trigger other icon links to be active', async () => {
    render(<Active />);

    const anchorElements = screen.getAllByRole('link');
    anchorElements[1].addEventListener('click', (e) => {
      e.preventDefault();
    });

    await userEvent.click(anchorElements[1]);

    expect(anchorElements[1]).toHaveAccessibleName(/active/i);
  });
});
