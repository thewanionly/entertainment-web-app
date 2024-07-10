export const getYear = (date?: string): string | undefined => {
  if (!date) return undefined;

  return new Date(date).getFullYear().toString();
};
