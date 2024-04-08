import { composeStory, render, screen } from '@/tests/utils';

import Meta, { Default as DefaultButtonStory } from './Button.stories';

const ButtonDefault = composeStory(DefaultButtonStory, Meta);

describe('Button', () => {
  it('displays the label', () => {
    render(<ButtonDefault />);

    expect(screen.getByRole('button', { name: ButtonDefault.args.children })).toBeInTheDocument();
  });
});
