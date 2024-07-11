export const getYear = (date?: string): string | undefined => {
  if (!date) return undefined;

  return new Date(date).getFullYear().toString();
};

export const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';

  const date = new Date(dateStr);

  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
