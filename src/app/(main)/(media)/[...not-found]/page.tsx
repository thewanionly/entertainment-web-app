import { notFound } from 'next/navigation';

// Workaround for not-found since apparently it doesn't work well with route groups:
// Reference: https://github.com/vercel/next.js/discussions/50034
export default function NotFoundCatcher() {
  notFound();
}
