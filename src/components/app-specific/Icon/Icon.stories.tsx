import type { Meta, StoryObj } from '@storybook/react';

import * as Icons from '@/components/app-specific/Icon';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof Icons> = {
  title: 'Components/Icon',
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof Icons>;

export const AllIcons: Story = {
  render: () => (
    <>
      <h1 className="mb-12 text-center text-white">List of Icons</h1>
      <div className="flex flex-wrap items-center justify-center gap-10">
        {Object.entries(Icons).map(([name, IconComponent]) => (
          <div key={name} className="text-green flex flex-col items-center">
            <IconComponent className="mb-3 h-8 w-8 text-white" title={name} />
            <span className="text-xs text-grey">{name}</span>
          </div>
        ))}
      </div>
    </>
  ),
};
