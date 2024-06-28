import Image from 'next/image';
import Link from 'next/link';

export const Attribution = () => {
  return (
    <div className="flex flex-col justify-between gap-1 lg:max-w-[56%] xl:max-w-[48%]">
      <p className="text-body-s text-white/75 sm:text-body-m">
        All media-related data used in this application is supplied by{' '}
        <Link
          href="https://www.themoviedb.org"
          target="_blank"
          className="font-medium text-greyish-blue hover:underline"
        >
          The Movie Database (TMDB).
        </Link>{' '}
        <em className="font-medium">
          This application uses the{' '}
          <Link
            href="https://developer.themoviedb.org/docs"
            target="_blank"
            className="font-medium text-greyish-blue hover:underline"
          >
            TMDB API
          </Link>{' '}
          but is not endorsed or certified by{' '}
          <Link
            href="https://www.themoviedb.org"
            target="_blank"
            className="font-medium text-greyish-blue hover:underline"
          >
            TMDB
          </Link>
          .
        </em>
      </p>

      <div className="mt-12 self-center text-center lg:self-start">
        <p className="mb-2 text-center text-greyish-blue lg:text-start">Powered by</p>
        <Link href="https://www.themoviedb.org" target="_blank">
          <div className="relative aspect-[13.8] w-[70vw] min-w-[6rem]  max-w-[15rem]">
            <Image src="/tmdb-logo.svg" alt="TMDB logo" title="TMDB" fill />
          </div>
        </Link>
      </div>
    </div>
  );
};
