import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

import { X } from 'lucide-react';
import useSWR from 'swr';

import { Search } from '@/components/app-specific/Icon';
import { Input } from '@/components/generic/Input';
import { MediaCardType, MediaType } from '@/types/medias';
import { cn } from '@/utils/styles';

import {
  AutoComplete,
  AUTOCOMPLETE_DEBOUNCE_MS,
  AUTOCOMPLETE_DEDUPING_INTERVAL_MS,
  AUTOCOMPLETE_LIMIT,
  MIN_AUTOCOMPLETE_QUERY_LENGTH,
  MULTI_SEARCH_MODE,
  fetchSearchAutocompleteResults,
  type SearchAutocompleteKey,
  type SearchAutocompleteMode,
} from '../AutoComplete';

type InputValue = React.InputHTMLAttributes<HTMLInputElement>['value'];

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  autoCompleteEnabled?: boolean;
  autoCompleteMediaType?: MediaType;
  onClear?: () => void;
  onSuggestionSelect?: (suggestion: MediaCardType) => void;
}

const getInputValue = (value: InputValue): string => {
  if (value === undefined || value === null) return '';
  if (Array.isArray(value)) return value.join(', ');

  return String(value);
};

const useDebounce = <T,>(value: T, delay = 500) => {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      defaultValue,
      disabled,
      autoCompleteEnabled = true,
      autoCompleteMediaType,
      onBlur,
      onChange,
      onClear,
      onFocus,
      onKeyDown,
      onSuggestionSelect,
      value,
      ...rest
    },
    ref
  ) => {
    const listboxId = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);
    const [uncontrolledSearchValue, setUncontrolledSearchValue] = useState(() =>
      getInputValue(defaultValue)
    );
    const isControlled = value !== undefined;
    const searchValue = isControlled ? getInputValue(value) : uncontrolledSearchValue;
    const normalizedSearchValue = searchValue.trim();
    const debouncedSearchValue = useDebounce(normalizedSearchValue, AUTOCOMPLETE_DEBOUNCE_MS);
    const searchMode: SearchAutocompleteMode = autoCompleteMediaType ?? MULTI_SEARCH_MODE;
    const hasEnoughSearchText = normalizedSearchValue.length >= MIN_AUTOCOMPLETE_QUERY_LENGTH;
    const hasEnoughDebouncedSearchText =
      debouncedSearchValue.length >= MIN_AUTOCOMPLETE_QUERY_LENGTH;
    const isWaitingForDebounce =
      autoCompleteEnabled &&
      !disabled &&
      hasEnoughSearchText &&
      normalizedSearchValue !== debouncedSearchValue;
    const shouldFetchAutoComplete =
      autoCompleteEnabled && !disabled && hasEnoughDebouncedSearchText && !isWaitingForDebounce;
    const swrKey: SearchAutocompleteKey | null = shouldFetchAutoComplete
      ? ['search-autocomplete', searchMode, debouncedSearchValue]
      : null;
    const { data, error, isLoading, isValidating } = useSWR<MediaCardType[]>(
      swrKey,
      fetchSearchAutocompleteResults,
      {
        dedupingInterval: AUTOCOMPLETE_DEDUPING_INTERVAL_MS,
        keepPreviousData: false,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );
    const suggestions = isWaitingForDebounce ? [] : (data ?? []).slice(0, AUTOCOMPLETE_LIMIT);
    const showAutoComplete = autoCompleteEnabled && isFocused && hasEnoughSearchText && !disabled;
    const isFetchingSuggestions =
      showAutoComplete &&
      (isWaitingForDebounce || isLoading || (isValidating && suggestions.length === 0));

    useEffect(() => {
      if (!isControlled) {
        setUncontrolledSearchValue(getInputValue(defaultValue));
      }
    }, [defaultValue, isControlled]);

    useEffect(() => {
      setHighlightedIndex(-1);
    }, [debouncedSearchValue, suggestions.length]);

    const setInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
          return;
        }

        if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const setSearchValue = (nextValue: string) => {
      if (!isControlled) {
        setUncontrolledSearchValue(nextValue);
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      setIsFocused(true);
      onChange?.(event);
    };

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHighlightedIndex(-1);
      onBlur?.(event);
    };

    const handleClearSearch = () => {
      setSearchValue('');
      setIsFocused(false);
      setHighlightedIndex(-1);
      onClear?.();
      inputRef.current?.focus();
    };

    const handleSelectSuggestion = (suggestion: MediaCardType) => {
      setSearchValue(suggestion.title);
      setIsFocused(false);
      setHighlightedIndex(-1);
      onSuggestionSelect?.(suggestion);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      if (event.key === 'Escape') {
        setIsFocused(false);
        setHighlightedIndex(-1);
        return;
      }

      if (!showAutoComplete || suggestions.length === 0) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex((currentIndex) =>
          currentIndex >= suggestions.length - 1 ? 0 : currentIndex + 1
        );
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex((currentIndex) =>
          currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1
        );
      }

      if (event.key === 'Enter' && highlightedIndex >= 0) {
        event.preventDefault();
        handleSelectSuggestion(suggestions[highlightedIndex]);
      }
    };

    return (
      <div className={cn('relative', className)}>
        <div className="flex gap-4 sm:gap-6">
          <Search
            className={cn('size-6 text-white sm:size-8', disabled && 'text-white/30')}
            title="search icon"
          />
          <div className="relative flex-1">
            <Input
              {...rest}
              ref={setInputRef}
              role="combobox"
              aria-autocomplete="list"
              aria-busy={isFetchingSuggestions}
              aria-controls={showAutoComplete ? listboxId : undefined}
              aria-expanded={showAutoComplete}
              aria-haspopup="listbox"
              aria-activedescendant={
                highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined
              }
              className={cn(
                'flex-1 border-none p-0 pt-0.5 font-light sm:pt-0 sm:text-heading-m',
                searchValue && 'pr-9',
                'relative after:absolute after:-bottom-2.5 after:h-px after:w-full after:bg-greyish-blue after:opacity-0 sm:after:-bottom-3.5',
                'focus-within:after:opacity-100 motion-safe:after:transition-opacity'
              )}
              disabled={disabled}
              autoComplete="off"
              value={searchValue}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleInputKeyDown}
            />
            {searchValue && !disabled && (
              <button
                type="button"
                className={cn(
                  'absolute right-0 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded',
                  'text-white/60 hover:bg-white/10 hover:text-white',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white'
                )}
                aria-label="Clear search"
                title="Clear search"
                onMouseDown={(event) => event.preventDefault()}
                onClick={handleClearSearch}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {showAutoComplete && (
          <AutoComplete
            id={listboxId}
            className="absolute left-0 right-0 top-full z-30 mt-4"
            error={error}
            highlightedIndex={highlightedIndex}
            isFetchingSuggestions={isFetchingSuggestions}
            isValidating={isValidating}
            searchValue={normalizedSearchValue}
            suggestions={suggestions}
            onClose={() => setIsFocused(false)}
            onHighlightSuggestion={setHighlightedIndex}
            onSelectSuggestion={handleSelectSuggestion}
          />
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };
