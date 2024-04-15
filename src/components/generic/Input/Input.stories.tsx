import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof Input> = {
  title: 'Generic Components/Input',
  component: Input,
  argTypes: {
    error: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { exclude: ['defaultValue', 'autoFocus'] },
  },
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof Input>;

export const Empty: Story = {
  args: {
    placeholder: 'Email address',
  },
};

export const Filled: Story = {
  args: {
    placeholder: 'Email address',
    defaultValue: 'john@example.com',
  },
};

export const Active: Story = {
  args: {
    placeholder: 'Email address',
    defaultValue: 'john@example.com',
    autoFocus: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Email address',
    defaultValue: 'john@example.com',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Email address',
    error: `Can't be empty`,
  },
};
