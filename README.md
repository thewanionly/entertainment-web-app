# Entertainment Web App

A media discovery web app for browsing, searching, and bookmarking movies and TV shows, built with React, Next.js, TypeScript, TailwinCSS, Jest, React Testing Library, and Storybook. It highlights component and test driven UI, and modern React and Next.js patterns like RSC, streaming SSR, and Server Actions.

![Entertainment Web App Preview](public/readme/preview.png)

View the live project [here](https://entertainment-web-app-wani.vercel.app/).

## Overview

This repository contains a media discovery application using [TMDB API](https://developer.themoviedb.org/docs/getting-started). It is designed as a production-minded frontend showcase: responsive, accessible, data-driven, componentized, tested, and structured around the kinds of workflows users expect from streaming-style entertainment interfaces.

The app is built around the core journeys entertainment users usually reach for first:

- home discovery sections for trending, popular, top-rated, now-playing, and upcoming media
- movie and TV series category pages with server-rendered data
- global search with autocomplete suggestions and dedicated results pages
- scoped movie and TV search flows
- persisted bookmarks with filtered bookmark search
- responsive media cards, carousels, grid views, dialogs, drawers, and trailer playback
- attribution and metadata pages for app context and third-party data credit

## Tech Stack

| Area             | Tools                                            |
| ---------------- | ------------------------------------------------ |
| Framework        | Next.js 14 App Router, React                     |
| Language         | TypeScript                                       |
| Styling          | Tailwind CSS                                     |
| Data             | TMDB API                                         |
| State            | Zustand                                          |
| UI               | shadcn                                           |
| Motion           | Framer Motion                                    |
| Search           | SWR, Fuse.js                                     |
| Testing          | Jest, React Testing Library, Storybook           |
| Tooling          | ESLint, Prettier, Husky, lint-staged, Commitizen |
| Observability    | Next.js web vitals                               |
| Build Inspection | Next bundle analyzer                             |

## Features

- Server-rendered entertainment discovery pages powered by TMDB movie and TV endpoints.
- Home sections for trending, popular, top-rated, now-playing, upcoming, and TV-focused discovery content.
- Dedicated movies and TV series routes with category validation, not-found handling, redirects, and loading skeletons.
- Global and media-scoped search pages with debounced autocomplete suggestions, keyboard navigation, and SWR request caching and deduping.
- Persisted bookmark collection using Zustand, with duplicate prevention and bookmark-specific search.
- Responsive media cards with backdrop imagery, metadata, bookmark controls, focus recovery, and modal launch behavior.
- Adaptive media details experience: drawer on smaller screens and dialog on larger screens.
- Trailer embedding from official YouTube videos when TMDB video data is available.
- Reusable generic component layer for buttons, inputs, carousels, dialogs, drawers, skeletons, navigation, and pictures.
- Storybook stories for core UI and app-specific components to support component-driven development.
- Jest and React Testing Library coverage for navigation, carousels, inputs, search, headers, media cards, and page sections.

## Architecture

```txt
src/
  app/
    layout.tsx                         Root document shell, metadata, web vitals
    actions/                           Server Actions for paginated media and search
    (main)/
      layout.tsx                       Shared app chrome and header
      about/                           Attribution and app information
      (media)/
        (home)/                        Home discovery sections
        [media]/                       Movies and TV series pages
        [media]/_category/             Category-specific media grids
        bookmarks/                     Persisted bookmark collection and search
        search/                        Global search results
  components/
    app-specific/
      Header/                          App navigation and responsive header behavior
      SearchBar/                       Search input, autocomplete, and shortcuts
      AutoComplete/                    Suggestion fetching and listbox UI
      MediaCard/                       Carousel and grid card variants
      MediaCarousel/                   Entertainment carousel composition
      MediaModal/                      Trailer and detail modal/drawer
      MediaSection/                    Grid, carousel, titles, and skeleton states
    generic/
      Button/                          Button and icon-button primitives
      Carousel/                        Embla carousel wrappers and controls
      Dialog/                          Radix dialog wrappers
      Drawer/                          Vaul drawer wrappers
      Input/                           Form input primitive
      Navigation/                      Nav composition and tests
      Picture/                         Responsive image wrapper
      Skeleton/                        Loading primitives
  services/
    medias/                            TMDB fetchers, response types, transformers
  stores/                              Zustand stores for bookmarks, modals, alerts
  hooks/                               Client-only and media-query helpers
  lib/                                 Fonts and navigation wrappers
  styles/                              Global Tailwind styles and design tokens
  tests/                               Test render utilities and mocks
```

## Engineering Notes

The app uses the Next.js App Router to split data-heavy pages into server-rendered route segments and focused client components. Discovery, category, and search pages fetch TMDB data on the server, while interactive pieces such as search autocomplete, bookmark state, dialogs, drawers, and carousels stay client-side.

React Server Components and `Suspense` keep page-level loading states close to the data they represent. The home page renders multiple discovery sections independently, so each section can stream behind its own skeleton instead of blocking the full page.

Search is designed as both a navigation workflow and an interaction pattern. The search bar supports debounced autocomplete, keyboard highlighting, `Escape` dismissal, `/` focus shortcut, and a full search action when the user wants broader results. Global search can return both movies and TV series, while media-specific pages scope results to the active route.

Bookmarks are intentionally local and lightweight. Zustand persists selected media cards in browser storage, prevents duplicates, and powers a bookmark page that can be searched without another server round trip.

The UI layer separates generic primitives from app-specific entertainment components. Generic components wrap Radix, Vaul, Embla, and local styling utilities, while app-specific components compose them into media cards, sections, modals, search, and header navigation.

Images and videos are normalized through service utilities before they reach the UI. TMDB responses are transformed into app-level media card types, missing artwork falls back to placeholders, and official YouTube trailer data is converted into embeddable video URLs.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Add your TMDB API values:

```bash
NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT=https://api.themoviedb.org/3
NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN=your_tmdb_v4_read_access_token
```

Start the frontend locally:

```bash
pnpm run dev
```

Build the frontend:

```bash
pnpm run build
```

Start the production build locally:

```bash
pnpm run start
```

## Quality Checks

Run linting:

```bash
pnpm run lint
```

Check formatting:

```bash
pnpm run format:check
```

Fix lint and formatting issues:

```bash
pnpm run format:fix
```

Run tests:

```bash
pnpm run test
```

Run tests in watch mode:

```bash
pnpm run test:dev
```

Run TypeScript checks:

```bash
pnpm run type:check
```

Analyze the production bundle:

```bash
ANALYZE=true pnpm run build
```

## Storybook

Run Storybook locally:

```bash
pnpm run storybook
```

Build the static Storybook:

```bash
pnpm run build-storybook
```

Storybook is used for component-driven development across reusable primitives and app-specific UI, including buttons, inputs, carousels, navigation, media cards, search, header states, icons, typography, and color tokens.

## Deployment

The application is configured as a standard Next.js app and is suitable for deployment on Vercel or any platform that supports Next.js 14.

Add these environment variables in the deployment project:

```bash
NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT=https://api.themoviedb.org/3
NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN=your_tmdb_v4_read_access_token
ANALYZE=false
```

Deploying updates the website code, component behavior, styles, and data-fetching logic. TMDB remains the external source for media content, posters, backdrops, metadata, and trailer information.
