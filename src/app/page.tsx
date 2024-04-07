import Logo from 'public/logo.svg';

import { NavBookmark, NavHome, NavMovies, NavTVSeries } from '@/components/app-specific/Icon';

export default function Home() {
  return (
    <main>
      <h1>Entertainment Web App</h1>
      <Logo />
      <NavHome />
      <NavMovies />
      <NavTVSeries />
      <NavBookmark />
    </main>
  );
}
