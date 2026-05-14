import { useEffect } from 'react';

import Image from 'next/image';

import { CornerDownLeft, Loader2 } from 'lucide-react';

import { Search } from '@/components/app-specific/Icon';
import { IMAGE_PLACEHOLDER } from '@/constants/images';
import { MEDIA_TYPE_MAP } from '@/constants/medias/mediaType';
import { MediasApiMediaType, MediasApiResponse } from '@/services/medias/mediasApi.types';
import { MediaCardType, MediaType } from '@/types/medias';
import { getYear } from '@/utils/dates';
import imageLoader from '@/utils/images';
import { cn } from '@/utils/styles';

export type SearchAutocompleteMode = MediaType | 'multi';
export type SearchAutocompleteKey = readonly [
  'search-autocomplete',
  SearchAutocompleteMode,
  string,
];

type SearchMediaResult = {
  id: number;
  media_type?: MediasApiMediaType;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  overview?: string;
};

type SupportedSearchMediaResult = SearchMediaResult & {
  media_type: MediasApiMediaType.MOVIE | MediasApiMediaType.TV;
};

type AutoCompleteItemProps = {
  id: string;
  isHighlighted: boolean;
  suggestion: MediaCardType;
  onMouseEnter: () => void;
  onSelect: () => void;
};

export type AutoCompleteProps = {
  className?: string;
  error?: unknown;
  highlightedIndex: number;
  id: string;
  isFetchingSuggestions: boolean;
  isValidating?: boolean;
  searchValue: string;
  suggestions: MediaCardType[];
  onHighlightSuggestion: (index: number) => void;
  onSearch: () => void;
  onSelectSuggestion: (suggestion: MediaCardType) => void;
};

export const AUTOCOMPLETE_DEBOUNCE_MS = 350;
export const AUTOCOMPLETE_DEDUPING_INTERVAL_MS = 60_000;
export const AUTOCOMPLETE_LIMIT = 6;
export const MIN_AUTOCOMPLETE_QUERY_LENGTH = 2;
export const MULTI_SEARCH_MODE = 'multi';

const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN}`,
  },
};

const getSearchPath = (mode: SearchAutocompleteMode): string => {
  if (mode === MediaType.MOVIE) return 'search/movie';
  if (mode === MediaType.TV) return 'search/tv';

  return 'search/multi';
};

const getForcedMediaType = (mode: SearchAutocompleteMode): MediasApiMediaType | undefined => {
  if (mode === MediaType.MOVIE) return MediasApiMediaType.MOVIE;
  if (mode === MediaType.TV) return MediasApiMediaType.TV;

  return undefined;
};

const isSupportedMediaResult = (result: SearchMediaResult): result is SupportedSearchMediaResult =>
  result.media_type === MediasApiMediaType.MOVIE || result.media_type === MediasApiMediaType.TV;

const transformAutoCompleteResult = (result: SupportedSearchMediaResult): MediaCardType => {
  const isMovie = result.media_type === MediasApiMediaType.MOVIE;

  return {
    id: result.id,
    imagePath: result.backdrop_path || result.poster_path || '',
    title: (isMovie ? result.title : result.name) ?? '',
    mediaType: isMovie ? MediaType.MOVIE : MediaType.TV,
    releaseDate: (isMovie ? result.release_date : result.first_air_date) ?? '',
    certification: '',
    overview: result.overview ?? '',
  };
};

export const fetchSearchAutocompleteResults = async ([
  ,
  mode,
  searchTerm,
]: SearchAutocompleteKey) => {
  const queryParams = new URLSearchParams({
    query: searchTerm,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/${getSearchPath(mode)}?${queryParams.toString()}`,
    options
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch autocomplete results for "${searchTerm}"`);
  }

  const forcedMediaType = getForcedMediaType(mode);
  const data = (await response.json()) as MediasApiResponse<SearchMediaResult>;

  return data.results
    .map((result) => ({
      ...result,
      media_type: result.media_type ?? forcedMediaType,
    }))
    .filter(isSupportedMediaResult)
    .map(transformAutoCompleteResult)
    .filter(({ title }) => title)
    .slice(0, AUTOCOMPLETE_LIMIT);
};

const AutoCompleteItem = ({
  id,
  isHighlighted,
  suggestion,
  onMouseEnter,
  onSelect,
}: AutoCompleteItemProps) => {
  const { icon: MediaTypeIcon, label: mediaTypeLabel } = MEDIA_TYPE_MAP[suggestion.mediaType];
  const year = getYear(suggestion.releaseDate);
  const imageSrc = suggestion.imagePath || '/images/no-image-placeholder.svg';

  return (
    <li id={id} role="option" aria-selected={isHighlighted}>
      <button
        type="button"
        className={cn(
          'group grid min-h-20 w-full grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3 px-3 py-2 text-left sm:grid-cols-[4.5rem_minmax(0,1fr)_auto]',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white',
          'hover:bg-white/10',
          isHighlighted && 'bg-white/10'
        )}
        onMouseDown={(event) => event.preventDefault()}
        onMouseEnter={onMouseEnter}
        onClick={onSelect}
      >
        <span className="relative row-span-2 block h-14 w-[4.5rem] overflow-hidden rounded bg-greyish-blue/20 sm:row-span-1">
          <Image
            src={imageSrc}
            loader={suggestion.imagePath ? imageLoader : undefined}
            alt=""
            width={72}
            height={56}
            className={cn(
              'h-full w-full',
              suggestion.imagePath ? 'object-cover' : 'object-contain p-2'
            )}
            placeholder="blur"
            blurDataURL={IMAGE_PLACEHOLDER}
          />
        </span>
        <span className="min-w-0 self-end sm:self-center">
          <span
            className="block truncate text-body-m font-medium text-white"
            title={suggestion.title}
          >
            {suggestion.title}
          </span>
          {suggestion.overview && (
            <span
              className="mt-1 block truncate text-body-s text-white/45"
              title={suggestion.overview}
            >
              {suggestion.overview}
            </span>
          )}
        </span>
        <span className="col-start-2 flex min-w-0 items-center justify-between gap-2 self-start text-body-s text-white/70 sm:col-start-auto sm:min-w-24 sm:flex-col sm:items-end sm:justify-center sm:self-center">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white/10 px-2 py-1">
            <MediaTypeIcon className="w-3 shrink-0 text-white/70" aria-hidden="true" />
            <span className="truncate">{mediaTypeLabel}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-white/50">
            {year && (
              <span className="rounded-full border border-white/10 px-2 py-0.5">{year}</span>
            )}
            <CornerDownLeft
              className={cn(
                'size-4 text-white/40 opacity-0 transition-opacity group-hover:opacity-100',
                isHighlighted && 'opacity-100'
              )}
              aria-hidden="true"
            />
          </span>
        </span>
      </button>
    </li>
  );
};

const AutoCompleteSkeleton = () => (
  <div className="space-y-2 p-3" role="status" aria-label="Searching">
    {[0, 1, 2].map((item) => (
      <div key={item} className="grid min-h-20 grid-cols-[4.5rem_1fr] items-center gap-3">
        <span className="h-14 w-[4.5rem] animate-pulse rounded bg-greyish-blue/30" />
        <span className="space-y-2">
          <span className="block h-4 w-3/4 animate-pulse rounded bg-greyish-blue/30" />
          <span className="block h-3 w-1/2 animate-pulse rounded bg-greyish-blue/20" />
        </span>
      </div>
    ))}
  </div>
);

export const AutoComplete = ({
  className,
  error,
  highlightedIndex,
  id,
  isFetchingSuggestions,
  isValidating = false,
  searchValue,
  suggestions,
  onHighlightSuggestion,
  onSearch,
  onSelectSuggestion,
}: AutoCompleteProps) => {
  const showSuggestions = !isFetchingSuggestions && suggestions.length > 0;
  const showEmptyState = !isFetchingSuggestions && !error && suggestions.length === 0;
  const showSearchAction = !isFetchingSuggestions && !error;
  const searchActionIndex = suggestions.length;
  const isSearchActionHighlighted = highlightedIndex === searchActionIndex;
  const liveMessage = (() => {
    if (isFetchingSuggestions) return 'Searching suggestions.';
    if (error) return 'Autocomplete suggestions failed to load.';
    if (showEmptyState) return `No autocomplete suggestions for "${searchValue}".`;

    return `${suggestions.length} ${suggestions.length === 1 ? 'suggestion' : 'suggestions'} available.`;
  })();

  useEffect(() => {
    if (highlightedIndex < 0) return;

    const highlightedOption = document.getElementById(`${id}-option-${highlightedIndex}`);

    highlightedOption?.scrollIntoView?.({ block: 'nearest' });
  }, [highlightedIndex, id]);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-greyish-blue/30 bg-semi-dark-blue shadow-2xl shadow-black/30',
        className
      )}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </p>
      <div className="max-h-[min(28rem,calc(100vh-12rem))] overflow-y-auto py-2">
        {isFetchingSuggestions && <AutoCompleteSkeleton />}

        {!isFetchingSuggestions && Boolean(error) && (
          <p className="px-4 py-5 text-body-m text-red">Unable to load suggestions.</p>
        )}

        {showSearchAction && (
          <ul id={id} role="listbox" aria-label="Search suggestions">
            {showSuggestions &&
              suggestions.map((suggestion, index) => (
                <AutoCompleteItem
                  key={`${suggestion.mediaType}-${suggestion.id}`}
                  id={`${id}-option-${index}`}
                  suggestion={suggestion}
                  isHighlighted={highlightedIndex === index}
                  onMouseEnter={() => onHighlightSuggestion(index)}
                  onSelect={() => onSelectSuggestion(suggestion)}
                />
              ))}
            <li
              id={`${id}-option-${searchActionIndex}`}
              role="option"
              aria-selected={isSearchActionHighlighted}
            >
              <button
                type="button"
                className={cn(
                  'flex w-full items-center gap-2 border-t border-greyish-blue/30 px-4 py-3',
                  'text-left text-body-s text-white/80 hover:bg-white/10 hover:text-white',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white',
                  isSearchActionHighlighted && 'bg-white/10 text-white'
                )}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => onHighlightSuggestion(searchActionIndex)}
                onClick={onSearch}
              >
                {isValidating ? (
                  <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
                ) : (
                  <Search className="size-4 shrink-0" title="search" />
                )}
                <span className="truncate">Search &quot;{searchValue}&quot;</span>
              </button>
            </li>
          </ul>
        )}

        {showEmptyState && (
          <p className="px-4 py-5 text-body-m text-white/70">
            No matches for &quot;{searchValue}&quot;.
          </p>
        )}
      </div>
    </div>
  );
};
