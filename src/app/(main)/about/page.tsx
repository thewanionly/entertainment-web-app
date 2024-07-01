import { Metadata } from 'next';

import { cn } from '@/utils/styles';

import { Attribution } from './_ui/Attribution';

export default async function AboutPage() {
  return (
    <section className="mx-auto mt-8 w-[91.467%] sm:mt-6 lg:mt-16 lg:w-full lg:px-9 2xl:pr-0">
      <h1
        className={cn(
          'inline-block capitalize',
          'mb-8 text-[1.25rem] font-light leading-[normal] tracking-[-0.019375rem]',
          'sm:text-heading-l lg:mb-[2.375rem]'
        )}
      >
        About
      </h1>
      <Attribution />
    </section>
  );
}

export const metadata: Metadata = {
  title: 'About',
};
