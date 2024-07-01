'use client';

// Error components must be Client Components
import { ErrorSection } from '@/components/app-specific/ErrorSection/ErrorSection';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorSection error={error} reset={reset} />;
}
