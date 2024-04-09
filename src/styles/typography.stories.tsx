import type { Meta, StoryObj } from '@storybook/react';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta = {
  title: 'Design System/Typography',
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj;

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-base mb-2 text-grey">
          <span className="font-medium">body-s</span> | Body (S) - Outfit Light (300) - 13px
        </p>
        <p className="text-body-s text-white">
          Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit
          nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.
        </p>
      </div>
      <div>
        <p className="text-base mb-2 text-grey">
          <span className="font-medium">text-body-m</span> | Body (M) - Outfit Light (300) - 15px
        </p>
        <p className="text-body-m text-white">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
          Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel,
          nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget
          blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.
        </p>
      </div>
      <div>
        <p className="text-base mb-2 text-grey">
          <span className="font-medium">text-heading-xs</span> | Heading (XS) - Outfit Medium (500)
          - 18px
        </p>
        <p className="text-heading-xs text-white">Nullam malesuada erat ut turpis</p>
      </div>
      <div>
        <p className="text-base mb-2 text-grey">
          <span className="font-medium">text-heading-s</span> | Heading (S) - Outfit Medium (500) -
          24px
        </p>
        <p className="text-heading-s text-white">Donec odio quisque volutpat mattis eros</p>
      </div>
      <div>
        <p className="text-base mb-2 text-grey">
          <span className="font-medium">text-heading-m</span> | Heading (M) - Outfit Light (300) -
          24px
        </p>
        <p className="text-heading-m text-white">Consectetuer adipiscing elit</p>
      </div>
      <div>
        <p className="text-base mb-2 text-grey">
          <span className="font-medium">text-heading-l</span> | Heading (L) - Outfit Light (300) -
          32px
        </p>
        <p className="text-heading-l text-white">Lorem ipsum dolor sit amet</p>
      </div>
    </div>
  ),
};
