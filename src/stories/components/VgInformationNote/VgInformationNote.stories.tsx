import type { Meta, StoryObj } from '@storybook/react';
import { VgInformationNote } from '../../../components/VgInformationNote/VgInformationNote';

const meta: Meta<typeof VgInformationNote> = {
  title: 'InformationNote',
  component: VgInformationNote,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'InformationNote component displays important information or notifications with different color variants and optional links.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    Variant: {
      control: 'select',
      options: ['information', 'warning', 'error'],
      description: 'The Variant property determines the color scheme of the information note, affecting both text and background colors.',
      table: {
        category: 'Appearance',
      },
    },
    Title: {
      control: 'text',
      description: 'The Title property allows users to add a heading to the information note, making it more prominent and easier to understand.',
      table: {
        category: 'Content',
      },
    },
    Children: {
      description: 'The main content of the information note that provides the actual message or information to be displayed.',
      table: {
        category: 'Content',
      },
    },
    LinkText: {
      control: 'text',
      description: 'The LinkText property allows users to add a clickable link to the information note, providing additional context or actions.',
      table: {
        category: 'Content',
      },
    },
    OnLinkClick: {
      action: 'clicked',
      description: 'The OnLinkClick property allows users to attach an event handler that triggers when the link is clicked.',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VgInformationNote>;

export const Default: Story = {
  args: {
    Variant: 'information',
    Title: 'Note: ',
    Children: 'This is a blue information note with some important details. ',
    LinkText: 'Learn more',
    OnLinkClick: () => alert('Link clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this Variant to display general information with an optional link for more details.',
      },
    },
  },
};

export const WithoutLink: Story = {
  args: {
    Variant: 'information',
    Title: 'Note: ',
    Children: 'This is a blue information note without a link.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this Variant when you need to display information without an additional action link.',
      },
    },
  },
}; 