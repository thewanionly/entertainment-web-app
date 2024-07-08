'use client';

import { ErrorRecoveryButton } from '@/components/app-specific/ErrorSection/ErrorRecoveryButton';
import { ErrorSection } from '@/components/app-specific/ErrorSection/ErrorSection';
import { outfit } from '@/lib/fonts';
import '@/styles/globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-dark-blue text-body-s text-white">
        <main className="max-w-limit lg:mx-auto">
          <ErrorSection error={error}>
            <ErrorRecoveryButton handleRecover={reset} />
          </ErrorSection>
        </main>
      </body>
    </html>
  );
}
