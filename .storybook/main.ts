import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    /* *********** Support for svg START *********** */
    // Sources:
    //  [1] https://github.com/storybookjs/storybook/issues/18557#issuecomment-1443742296
    //  [2] https://github.com/RyanClementsHax/storybook-addon-next/blob/06480c7de9424296b8ffdfa5df5ecf54f378213a/README.md#custom-webpack-config

    // This modifies the existing image rule to exclude .svg files
    // since we want to handle those files with @svgr/webpack
    const imageRule = config.module?.rules?.find((rule) => {
      if (rule && typeof rule !== 'string' && rule.test instanceof RegExp) {
        return rule.test.test('.svg');
      }
    });

    if (imageRule && typeof imageRule !== 'string') {
      imageRule.exclude = /\.svg$/;
    }

    // Configure .svg files to be loaded with @svgr/webpack
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    /* *********** Support for svg END *********** */

    return config;
  },
};
export default config;
