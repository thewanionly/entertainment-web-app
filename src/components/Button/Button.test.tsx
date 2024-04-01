import { composeStory, render, screen } from '@/tests/utils';

import Meta, { Primary as PrimaryButtonStory } from './Button.stories';

const ButtonPrimary = composeStory(PrimaryButtonStory, Meta);

describe('Button', () => {
  it('displays the label', () => {
    render(<ButtonPrimary />);

    expect(screen.getByRole('button', { name: ButtonPrimary.args.label })).toBeInTheDocument();
  });
});
