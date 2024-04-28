import { setProjectAnnotations } from '@storybook/react';
import '@testing-library/jest-dom';

import { MockedImage } from '@/tests/mocks/image';

// Integrate storybook into testing
// Source: https://storybook.js.org/docs/writing-tests/stories-in-unit-tests
import globalStorybookConfig from './.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

// next/image mock
jest.mock('next/image', () => ({
  __esModule: true,
  default: MockedImage,
}));

// window.matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
