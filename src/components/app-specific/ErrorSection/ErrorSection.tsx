'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { Button } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

type ErrorSectionProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export const ErrorSection = ({ error, reset }: ErrorSectionProps) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto mt-8 w-[91.467%] sm:mt-6 lg:mt-16 lg:w-full lg:px-9 2xl:pr-0">
      <h1
        className={cn(
          'inline-block capitalize',
          'mb-8 text-[1.25rem] font-light leading-[normal] tracking-[-0.019375rem]',
          'sm:text-heading-l lg:mb-[2.375rem]'
        )}
      >
        Something went wrong!
      </h1>
      <p className="text-body-s text-white/75 sm:text-body-m">
        Sorry, it seems like an error has occurred. Please{' '}
        <Button variant="link" className="p-0 hover:text-red/80">
          try again
        </Button>
        .
      </p>
      <Button
        className="mt-6"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        <Link href="/">Try again</Link>
      </Button>
    </section>
  );
};
