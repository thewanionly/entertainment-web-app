import { composeStories, render, screen, userEvent } from '@/tests/utils';

import * as ButtonStories from './Button.stories';
import * as IconButtonStories from './IconButton.stories';

const { Default, Secondary, Outline, AsChild, Disabled } = composeStories(ButtonStories);
const { IconButton, IconLink } = composeStories(IconButtonStories);

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

  it('displays an icon within the button', () => {
    render(<IconButton />);

    const btnElement = screen.getByRole('button');
    const icon = btnElement.querySelector('svg');

    expect(icon).toBeInTheDocument();
  });

  it('renders an anchor element instead of button when `asChild` is true and child is an anchor element', () => {
    render(<AsChild />);

    const btnElement = screen.queryByRole('button');
    const anchorElement = screen.getByRole('link');

    expect(btnElement).not.toBeInTheDocument();
    expect(anchorElement).toBeInTheDocument();
  });

  it('displays an icon within the anchor element', () => {
    render(<IconLink />);

    const anchorElement = screen.getByRole('link');
    const icon = anchorElement.querySelector('svg');

    expect(icon).toBeInTheDocument();
  });

  it('calls the function passed in the `onClick` prop when button is clicked', async () => {
    const onClickHandler = jest.fn();
    render(<Outline onClick={onClickHandler} />);

    const btnElement = screen.getByRole('button');
    await userEvent.click(btnElement);

    expect(onClickHandler).toHaveBeenCalled();
  });

  it('does not call the function passed in the `onClick` prop when a disabled button is clicked', async () => {
    const onClickHandler = jest.fn();
    render(<Disabled onClick={onClickHandler} />);

    const btnElement = screen.getByRole('button');
    await userEvent.click(btnElement);

    expect(onClickHandler).not.toHaveBeenCalled();
  });
});
