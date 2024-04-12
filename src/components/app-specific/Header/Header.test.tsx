import { composeStories, render, screen } from '@/tests/utils';

import { HEADER_LOGO_ALT_TEXT, HEADER_LOGO_IMG_PATH } from './Header.constants';
import * as HeaderStories from './Header.stories';

const { Horizontal } = composeStories(HeaderStories);

describe('Header', () => {
  it('displays app logo', () => {
    render(<Horizontal />);

    const appLogoImg = screen.getByAltText(HEADER_LOGO_ALT_TEXT);

    expect(appLogoImg).toHaveAttribute('src', HEADER_LOGO_IMG_PATH);
  });

  it('contains link to Home page in the logo', () => {
    render(<Horizontal />);

    const appLogoLink = screen.getByRole('link', { name: HEADER_LOGO_ALT_TEXT });

    expect(appLogoLink).toHaveAttribute('href', '/');
  });
});
