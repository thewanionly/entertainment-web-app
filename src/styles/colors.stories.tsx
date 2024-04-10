import type { Meta, StoryObj } from '@storybook/react';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta = {
  title: 'Design System/Colors',
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj;

export const Colors: Story = {
  render: () => (
    <>
      <h1 className="mb-14 text-heading-m text-white">Colors</h1>
      <ul className="flex flex-wrap gap-10">
        <li>
          <div className="mb-2 h-[60px] w-[125px] rounded-lg bg-red" />
          <p className="text-center text-white">#FC4747</p>
        </li>
        <li>
          <div className="mb-2 h-[60px] w-[125px] rounded-lg bg-dark-blue" />
          <p className="text-center text-white">#10141E</p>
        </li>
        <li>
          <div className="mb-2 h-[60px] w-[125px] rounded-lg bg-greyish-blue" />
          <p className="text-center text-white">#5A698F</p>
        </li>
        <li>
          <div className="mb-2 h-[60px] w-[125px] rounded-lg bg-semi-dark-blue" />
          <p className="text-center text-white">#161D2F</p>
        </li>
        <li>
          <div className="mb-2 h-[60px] w-[125px] rounded-lg bg-white" />
          <p className="text-center text-white">#FFFFFF</p>
        </li>
        <li>
          <div className="mb-2 h-[60px] w-[125px] rounded-lg bg-grey" />
          <p className="text-center text-white">#979797</p>
        </li>
      </ul>
    </>
  ),
};
