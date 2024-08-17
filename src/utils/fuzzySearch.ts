import Fuse from 'fuse.js';

const options = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.3, // Lower threshold for stricter matching
};

export const isFuzzyMatch = (sourceStr: string, searchStr: string): boolean => {
  // Initialize Fuse with an array of your main string
  const fuse = new Fuse([sourceStr], options);

  // Perform the fuzzy search
  const result = fuse.search(searchStr);

  // Check if a match is found
  return result.length > 0;
};
