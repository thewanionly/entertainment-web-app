'use client';

import { ErrorSection } from '@/components/app-specific/ErrorSection/ErrorSection';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main>
          <ErrorSection error={error} reset={reset} />;
        </main>
      </body>
    </html>
  );
}
