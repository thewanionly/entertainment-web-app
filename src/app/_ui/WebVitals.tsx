'use client';

import { NextWebVitalsMetric } from 'next/app';
import { useReportWebVitals } from 'next/web-vitals';

// In Vercel, speed insights are automatically configured on Vercel deployments,
// and don't require the use of useReportWebVitals.
// This hook/component is useful in local development,
// Reference: https://nextjs.org/docs/app/api-reference/functions/use-report-web-vitals#usage-on-vercel

const logWebVitals = (metric: NextWebVitalsMetric) => {
  // eslint-disable-next-line no-console
  console.table([metric]);
};

export function WebVitals() {
  useReportWebVitals((metric) => {
    logWebVitals(metric);
  });

  return null;
}
