import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      red: '#FC4747',
      'dark-blue': '#10141E',
      'semi-dark-blue': '#161D2F',
      'greyish-blue': '#5A698F',
      white: '#FFFFFF',
    },
    extend: {
      fontFamily: {
        outfit: ['var(--font-outfit)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
