# Entertainment Web App

A web app that lets you search for your favourite movies and TV shows and bookmark them. This is built with **NextJS 14** using the **app directory** making use of bleeding-edge technology such as **Server Side Rendering (SSR)**, **React Server Components (RSC)**, **Streaming SSR** and **Server Actions**.

## Technologies used

1. NextJS 14
2. React
3. TypeScript
4. Tailwind CSS
5. Jest and RTL (for unit and integration testing)
6. Storybook (for CDD)
7. Zustand (for State Management)
8. shadcn (headless component library reference)
9. Framer Motion (animation)

## Running the app

1. Clone the application.
2. Install the dependencies:

```bash
npm install
```

3. Create your local environment file:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your TMDB access token:

```bash
NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT=https://api.themoviedb.org/3
NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN=your_tmdb_v4_read_access_token
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local server URL ([http://localhost:3000](http://localhost:3000)) in your web browser.

6. To run the test files:

```bash
npm run test:dev
```

7. To run storybook:

```bash
npm run storybook
```
