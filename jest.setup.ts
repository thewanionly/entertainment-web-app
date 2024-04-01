import { setProjectAnnotations } from '@storybook/react';
import '@testing-library/jest-dom';

// Integrate storybook into testing
// Source: https://storybook.js.org/docs/writing-tests/stories-in-unit-tests
import globalStorybookConfig from './.storybook/preview';

setProjectAnnotations(globalStorybookConfig);
