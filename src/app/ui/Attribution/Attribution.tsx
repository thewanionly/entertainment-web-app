import Image from 'next/image';
import Link from 'next/link';

export const Attribution = () => {
  return (
    <div className="mx-auto flex w-[91.467%] flex-col items-center justify-center gap-5 text-center lg:mx-9">
      <Link href="https://www.themoviedb.org/" target="_blank">
        <div className="relative aspect-[7] w-[10vw] min-w-[6rem] max-w-[8rem]">
          <Image src="/tmdb-logo.svg" alt="TMDB logo" title="TMDB" fill />
        </div>
      </Link>
      <p className="text-[11px] font-light text-white/75 sm:text-body-s">
        This product uses the{' '}
        <Link
          href="https://developer.themoviedb.org/docs"
          target="_blank"
          className="font-medium text-white hover:underline"
        >
          TMDB API
        </Link>{' '}
        but is not endorsed or certified by{' '}
        <Link
          href="https://www.themoviedb.org/"
          target="_blank"
          className="font-medium text-white hover:underline"
        >
          TMDB
        </Link>
        .
      </p>
    </div>
  );
};
