import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Source: https://github.com/tailwindlabs/tailwindcss/discussions/12983#discussioncomment-8522228
const twMerge = extendTailwindMerge({
  // use the `extend` key in case you want to extend instead of override
  override: {
    theme: {
      colors: [
        'red',
        'dark-blue',
        'semi-dark-blue',
        'greyish-blue',
        'white',
        'light-grey',
        'grey',
        'black',
        'transparent',
      ],
    },
    classGroups: {
      'font-size': [
        { text: ['body-s', 'body-m', 'heading-xs', 'heading-s', 'heading-m', 'heading-l'] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
