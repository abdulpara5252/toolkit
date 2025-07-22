import VgLinkControl from '../../../components/VgLinkControl/VgLinkControl';

export default {
  title: 'Link Control',
  component: VgLinkControl,
  parameters: {
    layout: 'centered',
    docs: {
        description: {
            component: 'Link component are component to navigate on hyper link. It can be any domain specific which open webpage'
        }
    }
},
  tags: ['autodocs'],
  argTypes: {
    URL: {
      control: { type: 'text' },
      description: `An HREF URL allows users to enter a valid webpage link, which is used to create clickable hyperlinks. The URL must include the correct format, such as starting with "http://" or "https://"`,
    },
    LinkControlText: {
      control: { type: 'text' },
      description: `LinkControlText enables users to input custom text that will be displayed as the clickable portion of a hyperlink. This allows the visible link text to differ from the actual URL.`,
      required:false,
    },
    UnderLine: {
      options: ['none', 'always', 'onhover'],
      control: { type: 'radio' },
      description: `The Underline option in a Link control allows users to choose how the underline appears, with settings like "none" (no underline), "default" (always underlined), or "onHover" (underline only when hovered over). This provides flexibility in link styling.`,
    },
    Icon: {
      control: { type: 'select' },
      options: ['plus', 'leftarrow'],
      description: `The "Icon" property allows selection of an icon to display before the link text. Options: plus, leftarrow.`,
    },
    Disable: {
      control: { type: 'boolean' },
      description: `The "Disable" property is a boolean that controls whether an input field or component is active. When set to true, the field is disabled, preventing user interaction; when false, the field remains fully interactive.`,
    },
    OnClick: {
      action: 'clicked',
      table: { category: "Events" },  
      description: `onClick is an event handler that triggers a specific action when a user clicks on the Link control. `,
    },
  },
};

const Template = (args) => <VgLinkControl {...args} />;

export const LinkControl = Template.bind({});
LinkControl.args = {
  LinkControlText: 'Click here',
  URL: '',
  Icon: 'leftarrow',
  UnderLine: 'none',
  Disable: false,
  OnClick: undefined,
};
