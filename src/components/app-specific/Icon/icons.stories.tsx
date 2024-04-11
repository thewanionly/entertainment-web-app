import type { Meta, StoryObj } from '@storybook/react';

import * as AllIcons from '@/components/app-specific/Icon';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof AllIcons> = {
  title: 'Design System/Icons',
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof AllIcons>;

export const Icons: Story = {
  render: () => (
    <>
      <h1 className="mb-14 text-heading-m text-white">Icons</h1>
      <ul className="flex flex-wrap gap-10">
        {Object.entries(AllIcons).map(([name, IconComponent]) => (
          <li key={name} className="text-green flex min-w-[100px] flex-col items-center">
            <IconComponent className="mb-3 h-8 w-8 text-white" />
            <span className="text-xs text-grey">{name}</span>
          </li>
        ))}
      </ul>
    </>
  ),
};
