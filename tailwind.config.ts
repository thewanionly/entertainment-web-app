import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    colors: {
      red: '#FC4747',
      'dark-blue': '#10141E',
      'semi-dark-blue': '#161D2F',
      'greyish-blue': '#5A698F',
      white: '#FFFFFF',
      grey: '#979797',
      black: '#000000',
      transparent: 'transparent',
    },
    fontSize: {
      'body-s': [
        '0.8125rem', // 13px
        {
          fontWeight: '300',
        },
      ],
      'body-m': [
        '0.9375rem', // 15px
        {
          fontWeight: '300',
        },
      ],
      'heading-xs': [
        '1.125rem', // 18px
        {
          fontWeight: '500',
        },
      ],
      'heading-s': [
        '1.5rem', // 24px
        {
          fontWeight: '500',
        },
      ],
      'heading-m': [
        '1.5rem', // 24px
        {
          fontWeight: '300',
        },
      ],
      'heading-l': [
        '2rem', // 32px
        {
          letterSpacing: '-0.5px',
          fontWeight: '300',
        },
      ],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        outfit: ['var(--font-outfit)', ...fontFamily.sans],
      },
      screens: {
        xs: { max: '320px' },
      },
      maxWidth: {
        limit: '90rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
