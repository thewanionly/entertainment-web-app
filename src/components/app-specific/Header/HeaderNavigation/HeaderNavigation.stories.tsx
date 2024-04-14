import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { NAV_LINKS } from '../Header.constants';
import { HeaderNavigation, HeaderNavigationProps } from './HeaderNavigation';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof HeaderNavigation> = {
  title: 'App Specific Components/HeaderNavigation',
  component: HeaderNavigation,
  parameters: {
    controls: { exclude: ['children'] },
  },
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof HeaderNavigation>;

type HeaderNavigationInteractiveProps = HeaderNavigationProps & { defaultActiveLink?: string };

const HeaderNavigationInteractive = ({
  orientation,
  defaultActiveLink = '',
}: HeaderNavigationInteractiveProps) => {
  const [activeLink, setActiveLink] = useState(defaultActiveLink);

  return (
    <HeaderNavigation orientation={orientation}>
      {NAV_LINKS.map((navLink) => (
        <HeaderNavigation.Item
          key={navLink.label}
          active={activeLink === navLink.url}
          onClick={() => setActiveLink(navLink.url)}
          {...navLink}
        />
      ))}
    </HeaderNavigation>
  );
};

export const Default: Story = {
  render: (args) => <HeaderNavigationInteractive {...args} />,
};

export const Active: Story = {
  render: (args) => <HeaderNavigationInteractive {...args} defaultActiveLink={NAV_LINKS[0].url} />,
};
