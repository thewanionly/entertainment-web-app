'use client';

import { ErrorRecoveryButton } from '@/components/app-specific/ErrorSection/ErrorRecoveryButton';
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
          <ErrorSection error={error}>
            <ErrorRecoveryButton handleRecover={reset} />
          </ErrorSection>
        </main>
      </body>
    </html>
  );
}
