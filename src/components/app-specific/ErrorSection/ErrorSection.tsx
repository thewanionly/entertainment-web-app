'use client';

import { ReactNode, useEffect } from 'react';

import { cn } from '@/utils/styles';

type ErrorSectionProps = {
  error: Error & { digest?: string };
  children: ReactNode;
};

export const ErrorSection = ({ error, children }: ErrorSectionProps) => {
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
        Sorry, it seems like an error has occurred. Please try again.
      </p>
      {children}
    </section>
  );
};
