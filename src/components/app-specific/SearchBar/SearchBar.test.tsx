import type { FormEvent, SVGProps } from 'react';
import { useState } from 'react';

import useSWR from 'swr';

import { composeStories, render, screen, userEvent } from '@/tests/utils';
import { MediaType } from '@/types/medias';

import { SearchBar } from './SearchBar';
import * as SearchBarStories from './SearchBar.stories';

jest.mock('@/components/app-specific/Icon', () => {
  const MockIcon = ({ title, ...props }: { title?: string } & SVGProps<SVGSVGElement>) => (
    <svg {...props}>{title && <title>{title}</title>}</svg>
  );

  return {
    MediaTypeMovie: MockIcon,
    MediaTypeTV: MockIcon,
    Search: MockIcon,
  };
});

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const { Empty, Filled, Active, Disabled } = composeStories(SearchBarStories);

describe('SearchBar', () => {
  beforeEach(() => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isValidating: false,
    });
  });

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

    const inputEl = screen.getByRole('combobox');

    expect(inputEl).toHaveValue(Filled.args.defaultValue as string);
    expect(inputEl).toHaveAttribute('aria-haspopup', 'listbox');
    expect(inputEl).toHaveAttribute('aria-keyshortcuts', '/');
  });

  it('displays an active/focused search input element', () => {
    render(<Active />);

    const inputEl = screen.getByRole('combobox');

    expect(inputEl).toHaveFocus();
  });

  it('reflects inputted value in the search input element', async () => {
    const inputValue = 'test';
    render(<Active />);

    const inputEl = screen.getByRole('combobox');

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, inputValue);

    expect(inputEl).toHaveValue(inputValue);
  });

  it('displays a disabled search input element', () => {
    render(<Disabled />);

    const inputEl = screen.getByRole('combobox');

    expect(inputEl).toBeDisabled();
  });

  it('allows keyboard navigation to the search action', async () => {
    const onSubmit = jest.fn((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });

    (useSWR as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          imagePath: '/jTswp6KyDYKtvC52GbHagrZbGvD.jpg',
          title: 'Beyond Earth',
          mediaType: MediaType.MOVIE,
          releaseDate: '2019-04-12',
          certification: '',
        },
        {
          id: 2,
          imagePath: '/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg',
          title: 'The Expanse',
          mediaType: MediaType.TV,
          releaseDate: '2015-12-14',
          certification: '',
        },
      ],
      error: undefined,
      isLoading: false,
      isValidating: false,
    });

    render(
      <form onSubmit={onSubmit}>
        <SearchBar defaultValue="beyond" placeholder="Search" />
      </form>
    );

    const inputEl = screen.getByRole('combobox');

    await userEvent.click(inputEl);
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');

    const listboxId = inputEl.getAttribute('aria-controls');

    expect(inputEl).toHaveAttribute('aria-activedescendant', `${listboxId}-option-2`);
    expect(screen.getByRole('option', { name: /search "beyond"/i })).toHaveAttribute(
      'aria-selected',
      'true'
    );

    await userEvent.keyboard('{Enter}');

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('submits the typed search value when Enter is pressed without a highlighted option', async () => {
    const submittedSearchValues: Array<FormDataEntryValue | null> = [];
    const onSubmit = jest.fn((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submittedSearchValues.push(new FormData(event.currentTarget).get('search'));
    });

    (useSWR as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          imagePath: '/jTswp6KyDYKtvC52GbHagrZbGvD.jpg',
          title: 'Beyond Earth',
          mediaType: MediaType.MOVIE,
          releaseDate: '2019-04-12',
          certification: '',
        },
      ],
      error: undefined,
      isLoading: false,
      isValidating: false,
    });

    const ControlledSearchBar = () => {
      const [searchValue, setSearchValue] = useState('');

      return (
        <form onSubmit={onSubmit}>
          <SearchBar
            name="search"
            placeholder="Search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </form>
      );
    };

    render(<ControlledSearchBar />);

    const inputEl = screen.getByRole('combobox');

    await userEvent.type(inputEl, 'beyond');
    await userEvent.keyboard('{Enter}');

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(submittedSearchValues).toEqual(['beyond']);
  });

  it('focuses the search input when slash is pressed outside a text field', async () => {
    render(<SearchBar placeholder="Search" />);

    const inputEl = screen.getByRole('combobox');

    expect(inputEl).not.toHaveFocus();

    await userEvent.keyboard('/');

    expect(inputEl).toHaveFocus();
    expect(inputEl).toHaveValue('');
  });

  it('keeps slash typing inside editable fields', async () => {
    render(
      <>
        <textarea aria-label="Notes" />
        <SearchBar placeholder="Search" />
      </>
    );

    const textarea = screen.getByRole('textbox', { name: /notes/i });
    const inputEl = screen.getByRole('combobox');

    await userEvent.click(textarea);
    await userEvent.keyboard('/');

    expect(textarea).toHaveValue('/');
    expect(inputEl).not.toHaveFocus();
  });
});
