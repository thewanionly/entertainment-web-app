import { composeStories, render, screen, userEvent } from '@/tests/utils';

import * as ButtonStories from './Button.stories';

const { Default, Secondary, Outline, AsChild, Disabled } = composeStories(ButtonStories);

describe('Button', () => {
  it('renders a button element by default', () => {
    render(<Default />);

    const btnElement = screen.getByRole('button');

    expect(btnElement).toBeInTheDocument();
  });

  it('displays children passed to the button', () => {
    render(<Secondary />);

    const btnLabel = screen.getByText(Secondary.args.children as string);

    expect(btnLabel).toBeInTheDocument();
  });

  it('displays a disabled button', () => {
    render(<Disabled />);

    const btnElement = screen.getByRole('button');

    expect(btnElement).toBeDisabled();
  });

  it('renders an anchor element instead of button when `asChild` is true and child is an anchor element', () => {
    render(<AsChild />);

    const btnElement = screen.queryByRole('button');
    const anchorElement = screen.getByRole('link');

    expect(btnElement).not.toBeInTheDocument();
    expect(anchorElement).toBeInTheDocument();
  });

  it('calls the function passed in the `onClick` prop when button is clicked', async () => {
    const onClickHandler = jest.fn();
    render(<Outline onClick={onClickHandler} />);

    const btnElement = screen.getByRole('button');
    await userEvent.click(btnElement);

    expect(onClickHandler).toHaveBeenCalled();
  });
});
