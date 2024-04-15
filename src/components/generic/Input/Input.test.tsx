import { composeStories, render, screen, userEvent } from '@/tests/utils';

import * as InputStories from './Input.stories';

const { Empty, Filled, Active, Disabled, Error } = composeStories(InputStories);

describe('Input', () => {
  it('displays an input element', () => {
    render(<Empty />);

    const inputEl = screen.getByRole('textbox');

    expect(inputEl).toBeInTheDocument();
  });

  it('displays an input element with placeholder', () => {
    render(<Empty />);

    const inputEl = screen.getByPlaceholderText(Empty.args.placeholder as string);

    expect(inputEl).toBeInTheDocument();
  });

  it('displays an input element with value', () => {
    render(<Filled />);

    const inputEl = screen.getByRole('textbox');

    expect(inputEl).toHaveValue(Filled.args.value as string);
  });

  it('displays an active/focused input element', () => {
    render(<Active />);

    const inputEl = screen.getByRole('textbox');

    expect(inputEl).toHaveFocus();
  });

  it('reflects inputted value in the input element', async () => {
    const inputValue = 'test';
    render(<Active />);

    const inputEl = screen.getByRole('textbox');

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, inputValue);

    expect(inputEl).toHaveValue(inputValue);
  });

  it('displays a disabled input element', () => {
    render(<Disabled />);

    const inputEl = screen.getByRole('textbox');

    expect(inputEl).toBeDisabled();
  });

  it('displays an input element with error message', () => {
    render(<Error />);

    const errorText = screen.getByText(Error.args.error as string);

    expect(errorText).toBeInTheDocument();
  });
});
