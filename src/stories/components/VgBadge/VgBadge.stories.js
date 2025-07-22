import VgBadge from '../../../components/VgBadge/VgBadge';

export default {
  title: 'Badge',
  component: VgBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badges are labels for smaller items on a page. It can be informational, a warning, positive, or an alert.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    BadgeVariation: {
      options: ['positive', 'informational', 'secondary-white', 'warning', 'alert', 'defaults', 'new', 'custom'],
      control: { type: 'radio' },
      description: `BadgeVariation refers to different styles or types of badges used in user interfaces to convey specific statuses or messages. Each variation visually represents a particular meaning to enhance user experience.
     
- Positive: Indicates a successful action or confirmation, typically displayed in green.\n
- Informational: Provides general information or tips.\n
- Secondary White: Indicates a secondary action on dark backgrounds, using white text and borders for contrast.\n
- Warning: Alerts the user to potential issues that need attention, commonly in yellow.\n
- Alert: Signals critical problems or errors requiring immediate action, often in red.\n
- Defaults: The standard badge style without any specific emphasis, serving as a neutral indicator.\n
- New: Indicate new Badges.\n`,
},
    BadgeSize: {
      control: 'radio',
      options: ['inline', 'large' ],
      description: `BadgeSize determines the visual size of the badge, offering options like inline, which keeps the badge small and aligned with surrounding text, or large, making the badge more prominent for emphasis. These options help in customizing badge visibility based on design requirements.`,

    },
    BadgeText: {
      control: { type: 'text' },
      description: `BadgeText allows users to input custom text or values that will be displayed within a badge. It provides flexibility for dynamic content, such as numbers or short messages, inside the badge for real-time updates or personalized labels.`,
    },
    Children: {
      control: false,
      if: { arg: "BadgeVariation", eq: "custom" },
      description: `Used in the 'custom' BadgeVariation to pass raw HTML or JSX content inside the badge. This enables fully customizable badge content such as icons, styled spans, or rich elements.`,
    },
    BadgeColorVariant: {
      if: { arg: "BadgeVariation", eq: "none" },
      name: "BadgeColorVariant",
      control: { type: 'select' },
      options: ['leave', 'black'],
      description: 'Select the color variant for the Notification Badge. This will override the default button colors.',
    }
  },
};

export const defaults = {
  args: {
    BadgeText: ' Input Badge',
    BadgeVariation: 'defaults', 
    BadgeSize: 'inline',
    Children: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', paddingRight: '8px' }}>
          <i className="fa-light fa-pen-to-square" style={{fontSize: '20px', marginRight: '4px', color: 'var(--text_neutral_default)'}}/>
          <span style={{color: 'var(--text_neutral_default)', fontSize: '16px'}}>Reviews</span>
        </span>
        <VgBadge BadgeSize="overlay" BadgeText="4" BadgeVariation="none" BadgeColorVariant="black" />
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary buttons are used most commonly. Only use another button if it requires more or less visual weight.',
      },
    },
  },
};

export const Positive = {
  args: {
    BadgeText: ' Input Badge',
    BadgeVariation: 'positive',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use to indicate a recommended action or positive feedback..',
      },
    },
  },
};

export const Warning = {
  args: {
    BadgeText: ' Input Badge',
    BadgeVariation: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use to give users a warning about an action.',
      },
    },
  },
};

export const Alert = {
  args: {
    BadgeText: ' Input Badge',
    BadgeVariation: 'alert',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use to alert users. Or information show to user',
      },
    },
  },
};

export const New = {
  args: {
    BadgeText: ' Input Badge',
    BadgeVariation: 'new',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use to indicate that an item is new to user.',
      },
    },
  },
};

export const Informational = {
  args: {
    BadgeText: ' Input Badge',
    BadgeVariation: 'informational',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use to display information to users about a certain action.',
      },
    },
  },
};

export const notification = {
  args: {
    BadgeText: '1',
    BadgeVariation: 'none',
    BadgeSize: 'overlay',
    BadgeColorVariant: 'leave'
  },
  parameters: {
    docs: {
      description: {
        story: 'Denotes the presence of notifications indication',
      },
    },
  },
  argTypes: {
    BadgeSize: { table: { disable: true } }, 
    BadgeVariation: { table: { disable: true } },
  },
};

export const SecondaryWhite = {
  args: {
    BadgeText: ' Input Badge',
    BadgeVariation: 'secondary-white',
    BadgeSize: 'inline'
  },
  parameters: {
    docs: {
      description: {
        story: 'Used for secondary actions on dark backgrounds with white borders and text for clear contrast.',
      },
    },
  },
};

export const Custom = {
  args: {
    BadgeVariation: 'custom',
    BadgeSize: 'inline',
    Children: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', paddingRight: '8px' }}>
          <i className="fa-light fa-pen-to-square" style={{fontSize: '20px', marginRight: '4px', color: 'var(--text_neutral_default)'}}/>
          <span style={{color: 'var(--text_neutral_default)', fontSize: '16px'}}>Reviews</span>
        </span>
        <VgBadge BadgeSize="overlay" BadgeText="4" BadgeVariation="none" BadgeColorVariant="black" />
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'This is a custom badge. You can pass any tag or component as children. This example shows an icon, text, and a nested badge.',
      },
    },
  },
  argTypes: {
    BadgeText: { table: { disable: true } },
    BadgeSize: { table: { disable: true } },
  },
};

