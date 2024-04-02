import type { Preview } from '@storybook/react';

import { outfit } from '@/lib/fonts';
import '@/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div id="storybook-decorator" className={outfit.variable}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
