import { composeStories, render, screen, userEvent } from '@/tests/utils';

import * as SearchBarStories from './SearchBar.stories';

const { Empty, Filled, Active, Disabled } = composeStories(SearchBarStories);

describe('SearchBar', () => {
  it('displays a search input with placeholder', () => {
    render(<Empty />);

    const inputEl = screen.getByPlaceholderText(Empty.args.placeholder as string);

    expect(inputEl).toBeInTheDocument();
  });

  it('displays a search icon', () => {
    render(<Empty />);

    const searchIcon = screen.getByTitle('search icon');

    expect(searchIcon).toBeInTheDocument();
  });

  it('displays a search input element with value', () => {
    render(<Filled />);

    const inputEl = screen.getByRole('textbox');

    expect(inputEl).toHaveValue(Filled.args.value as string);
  });

  it('displays an active/focused search input element', () => {
    render(<Active />);

    const inputEl = screen.getByRole('textbox');

    expect(inputEl).toHaveFocus();
  });

  it('reflects inputted value in the search input element', async () => {
    const inputValue = 'test';
    render(<Active />);

    const inputEl = screen.getByRole('textbox');

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, inputValue);

    expect(inputEl).toHaveValue(inputValue);
  });

  it('displays a disabled saerch input element', () => {
    render(<Disabled />);

    const inputEl = screen.getByRole('textbox');

    expect(inputEl).toBeDisabled();
  });
});
