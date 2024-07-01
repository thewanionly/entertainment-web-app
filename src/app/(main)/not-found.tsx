import Link from 'next/link';

import { Button } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

export default function NotFound() {
  return (
    <section className="mx-auto mt-8 w-[91.467%] sm:mt-6 lg:mt-16 lg:w-full lg:px-9 2xl:pr-0">
      <h1
        className={cn(
          'inline-block capitalize',
          'mb-8 text-[1.25rem] font-light leading-[normal] tracking-[-0.019375rem]',
          'sm:text-heading-l lg:mb-[2.375rem]'
        )}
      >
        404 - Page Not Found
      </h1>

      <p className="text-body-s text-white/75 sm:text-body-m">{`Sorry, we can't find the page you are looking for.`}</p>
      <p className="text-body-s text-white/75 sm:text-body-m">
        Please re-check the URL or return to the{' '}
        <Link href="/" className="text-white hover:text-red/80 hover:underline">
          home page
        </Link>
        .
      </p>
      <Button variant="link" className="mt-6 bg-red text-white hover:bg-red/80 hover:no-underline">
        <Link href="/">Go back home</Link>
      </Button>
    </section>
  );
}
