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
